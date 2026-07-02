from django.db import models


class Profile(models.Model):
    """One row: your core info, used by Hero / About / Contact sections."""
    name = models.CharField(max_length=120)
    title = models.CharField(max_length=120, help_text="e.g. Software Developer")
    tagline = models.CharField(max_length=255, help_text="Short intro line for the Hero section")
    about = models.TextField(help_text="Longer professional summary for the About section")
    location = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    resume_file = models.FileField(upload_to="resume/", blank=True, null=True)
    avatar = models.ImageField(upload_to="avatar/", blank=True, null=True)

    def __str__(self):
        return self.name


class SkillCategory(models.Model):
    """Groups skills: Backend, Frontend, Databases, Cloud & Deployment, etc."""
    name = models.CharField(max_length=80)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name_plural = "Skill categories"

    def __str__(self):
        return self.name


class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, related_name="skills", on_delete=models.CASCADE)
    name = models.CharField(max_length=80)
    icon = models.CharField(max_length=60, blank=True, help_text="react-icons name, e.g. 'SiDjango'")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return f"{self.name} ({self.category.name})"


class Experience(models.Model):
    role = models.CharField(max_length=150)
    company = models.CharField(max_length=150)
    location = models.CharField(max_length=120, blank=True)
    start_date = models.CharField(max_length=40, help_text="e.g. Feb 2026")
    end_date = models.CharField(max_length=40, help_text="e.g. Present")
    responsibilities = models.JSONField(default=list, help_text="List of bullet-point strings")
    technologies = models.JSONField(default=list, help_text="List of tech name strings")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.role} @ {self.company}"


class Project(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    tech_stack = models.JSONField(default=list)
    features = models.JSONField(default=list, blank=True)
    screenshot = models.ImageField(upload_to="projects/", blank=True, null=True)
    github_url = models.URLField(blank=True)
    live_demo_url = models.URLField(blank=True)
    featured = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


class Certification(models.Model):
    title = models.CharField(max_length=150)
    issuer = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=60, blank=True)
    date_earned = models.CharField(max_length=40, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.title} — {self.issuer}"


class ContactMessage(models.Model):
    """Every submission from the Contact form lands here."""
    name = models.CharField(max_length=120)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} <{self.email}>"