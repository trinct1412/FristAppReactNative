from django.db import models
from user.models import User
from django.utils.timezone import now


class Genres(models.Model):
    name = models.CharField(max_length=500)

    def __str__(self):
        return self.name

    @staticmethod
    def get_items():
        return Genres.objects.all()


class Movie(models.Model):
    name = models.CharField(max_length=500, null=True, blank=True)
    imdbid = models.IntegerField()
    href = models.CharField(max_length=500, null=True, blank=True)
    year = models.IntegerField()
    rated = models.CharField(max_length=100, null=True, blank=True)
    release = models.CharField(max_length=250, null=True, blank=True)
    runtime = models.CharField(max_length=250, null=True, blank=True)
    write = models.CharField(max_length=250, null=True, blank=True)
    actor = models.CharField(max_length=250, null=True, blank=True)
    plot = models.CharField(max_length=500, null=True, blank=True)
    language = models.CharField(max_length=250, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    awards = models.CharField(max_length=100, null=True, blank=True)
    poster = models.CharField(max_length=250, null=True, blank=True)
    genres = models.ForeignKey(Genres, related_name='item', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    @staticmethod
    def get_items():
        return Movie.objects.all()

    @staticmethod
    def get_items_ids(ids):
        return Movie.objects.filter(pk__in=ids)

    @staticmethod
    def get_item(id):
        return Movie.objects.get(pk=id)

    @staticmethod
    def get_item_name(name):
        return Movie.objects.filter(name__icontains=name)

    @staticmethod
    def get_item_genres(c_id):
        return Movie.objects.filter(genres=c_id)


class Evaluation(models.Model):
    user = models.ForeignKey(User, related_name='invoice', on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, related_name='movie', on_delete=models.CASCADE)
    evaluation_index = models.IntegerField(blank=True,null=True)
    date_watch = models.DateTimeField(default=now, blank=True)

    def __str__(self):
        return '{} {}'.format(self.id, self.user.name)
