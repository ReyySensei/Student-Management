from rest_framework.views import APIView
from rest_framework.response import Response
from django.http.response import JsonResponse
from django.http import Http404
from .serializers import StudentSerializer, CourseSerializer, AdminAccountSerializer
from .models import Student, Course, AdminAccount

class StudentView(APIView):
    def get_student(self, pk):
        try:
            return Student.objects.get(studentId=pk)
        except Student.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            student = self.get_student(pk)
            serializer = StudentSerializer(student)
        else:
            students = Student.objects.all()
            serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            student = serializer.save()
            
            course_name = student.Course
            if course_name:
                Course.objects.get_or_create(courseName=course_name)
            return JsonResponse("Student Created Successfully", safe=False)
        print(serializer.errors)
        return JsonResponse("Failed to Add Student", safe=False)

    def put(self, request, pk=None):
        student = self.get_student(pk)
        serializer = StudentSerializer(student, data=request.data, partial=True)
        if serializer.is_valid():
            student = serializer.save()
           
            course_name = student.Course
            if course_name:
                Course.objects.get_or_create(courseName=course_name)
            return JsonResponse("Student Updated Successfully", safe=False)
        return JsonResponse("Failed to Update Student", safe=False)

    def delete(self, request, pk=None):
        student = self.get_student(pk)
        student.delete()
        return JsonResponse("Student Deleted Successfully", safe=False)


class CourseView(APIView):
    def get_course(self, pk):
        try:
            return Course.objects.get(courseId=pk)
        except Course.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            course = self.get_course(pk)
            serializer = CourseSerializer(course)
        else:
            courses = Course.objects.all()
            serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Course Created Successfully", safe=False)
        return JsonResponse("Failed to Add Course", safe=False)

    def put(self, request, pk=None):
        course = self.get_course(pk)
        serializer = CourseSerializer(course, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Course Updated Successfully", safe=False)
        return JsonResponse("Failed to Update Course", safe=False)

    def delete(self, request, pk=None):
        course = self.get_course(pk)
        course.delete()
        return JsonResponse("Course Deleted Successfully", safe=False)


class AdminLoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        try:
            admin = AdminAccount.objects.get(email=email, password=password)
            return JsonResponse({"message": "Login successful", "adminId": admin.adminId}, safe=False)
        except AdminAccount.DoesNotExist:
            return JsonResponse({"error": "Invalid email or password"}, status=401)
