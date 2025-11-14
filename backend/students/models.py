from django.db import models

class Course(models.Model):
    courseId = models.AutoField(primary_key=True)
    courseName = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.courseName


class Student(models.Model):
    studentId = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=100)
    LastName = models.CharField(max_length=100)
    RegistrationNo = models.CharField(max_length=100)
    Email = models.CharField(max_length=100)
    Course = models.CharField(max_length=100, null=True, blank=True)  

    def __str__(self):
        return f"{self.FirstName} {self.LastName}"


class AdminAccount(models.Model):
    adminId = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  

    def __str__(self):
        return self.email


