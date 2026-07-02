from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    ProfileViewSet, SkillCategoryViewSet, ExperienceViewSet,
    ProjectViewSet, CertificationViewSet, ContactMessageCreateView
)

router = DefaultRouter()
router.register("profile", ProfileViewSet, basename="profile")
router.register("skills", SkillCategoryViewSet, basename="skills")
router.register("experience", ExperienceViewSet, basename="experience")
router.register("projects", ProjectViewSet, basename="projects")
router.register("certifications", CertificationViewSet, basename="certifications")

urlpatterns = [
    path("", include(router.urls)),
    path("contact/", ContactMessageCreateView.as_view(), name="contact"),
]