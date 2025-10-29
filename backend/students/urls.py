from django.urls import path
from .views import StudentView, CourseView

urlpatterns = [
    path("students/", StudentView.as_view()),
    path("students/<int:pk>/", StudentView.as_view()),
    path("courses/", CourseView.as_view()),
    path("courses/<int:pk>/", CourseView.as_view()),
]
