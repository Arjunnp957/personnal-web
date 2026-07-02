from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from .models import (
    Profile, SkillCategory, Experience,
    Project, Certification, ContactMessage
)
from .serializers import (
    ProfileSerializer, SkillCategorySerializer, ExperienceSerializer,
    ProjectSerializer, CertificationSerializer, ContactMessageSerializer
)


class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only: GET /api/profile/ and /api/profile/<id>/"""
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class SkillCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """GET /api/skills/ — returns categories, each with nested skills"""
    queryset = SkillCategory.objects.prefetch_related("skills").all()
    serializer_class = SkillCategorySerializer


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    """GET /api/experience/"""
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """GET /api/projects/"""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class CertificationViewSet(viewsets.ReadOnlyModelViewSet):
    """GET /api/certifications/"""
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer


class ContactMessageCreateView(generics.CreateAPIView):
    """POST /api/contact/ — the only *write* endpoint; visitors submit here"""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": "Message sent successfully."},
            status=status.HTTP_201_CREATED,
        )