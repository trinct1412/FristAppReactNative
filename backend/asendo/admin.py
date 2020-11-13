from django.contrib import admin
from .models import Movie,User,Genres,Evaluation

# Register your models here.
admin.site.register(Movie)
admin.site.register(User)
admin.site.register(Genres)
admin.site.register(Evaluation)
