from rest_framework import serializers
from .models import Student, Course
from .models import AdminAccount 

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = (
            "studentId",
            "FirstName",
            "LastName",
            "IDNo",
            "Email",
            "Course",
        )


class CourseSerializer(serializers.ModelSerializer):
    students = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ("courseId", "Course", "students")

    def get_students(self, obj):
        return list(Student.objects.filter(Course=obj.Course).values_list("IDNo", flat=True))


class AdminAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminAccount  
        fields = ("adminId", "email", "password")
