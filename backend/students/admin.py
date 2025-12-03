from django.contrib import admin
from django.utils.html import format_html
from .models import Student, Course, AdminAccount

class StudentAdmin(admin.ModelAdmin):
    list_display = ("IDNo", "FirstName", "LastName", "Course")
    search_fields = ("IDNo", "FirstName", "LastName")

class CourseAdmin(admin.ModelAdmin):
    list_display = ("courseName",)
    search_fields = ("courseName",)
    readonly_fields = ("enrolled_students",)

    def enrolled_students(self, obj):
        students = Student.objects.filter(Course=obj.courseName)
        if not students.exists():
            return "No students enrolled"

        # Include RegistrationNo + full name
        lines = [
            f"{i + 1}. {s.IDNo} — {s.FirstName} {s.LastName}"
            for i, s in enumerate(students)
        ]
        return format_html("<br>".join(lines))

    enrolled_students.short_description = "Registered Students"

class AdminAccountAdmin(admin.ModelAdmin):
    list_display = ("email",)
    search_fields = ("email",)

admin.site.register(Student, StudentAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(AdminAccount)