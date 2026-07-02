from django.contrib import admin
from .models import (
    Profile, SkillCategory, Skill, Experience,
    Project, Certification, ContactMessage
)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "title", "email")


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "order")
    inlines = [SkillInline]


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("role", "company", "start_date", "end_date", "order")
    ordering = ("order",)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "featured", "order")
    list_filter = ("featured",)
    ordering = ("order",)


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ("title", "issuer", "date_earned", "order")
    ordering = ("order",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "created_at", "is_read")
    list_filter = ("is_read",)
    readonly_fields = ("created_at",)