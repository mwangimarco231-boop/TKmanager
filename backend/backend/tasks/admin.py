from django.contrib import admin
from .models import Tasks

# Register your models here.


@admin.register(Tasks)
class TasksAdmin(admin.ModelAdmin):
    # This shows these columns in the admin list view
    list_display = ('title', 'completed', 'created_at')
    # This adds a filter sidebar for the 'completed' status
    list_filter = ('completed',)
    # This adds a search bar for the title
    search_fields = ('title',)
