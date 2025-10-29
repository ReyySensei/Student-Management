from rest_framework import serializers
from .models import Student, Course

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = (
            "studentId",
            "FirstName",
            "LastName",
            "RegistrationNo",
            "Email",
            "Course",
        )


class CourseSerializer(serializers.ModelSerializer):
    # show registration numbers of students enrolled in this course
    students = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ("courseId", "courseName", "students")

    def get_students(self, obj):
        return list(Student.objects.filter(Course=obj.courseName).values_list("RegistrationNo", flat=True))
