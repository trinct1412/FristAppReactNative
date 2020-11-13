from django.conf.urls import url
from asendo.api.view import ListMovieView,CreateMovieView,UpdateMovieView,ListGenres,CreateEvaluationView,UpdateEvaluationView
urlpatterns = [
    url(r'^/movies/$', ListMovieView.as_view()),
    url(r'^/movie/create$', CreateMovieView.as_view()),
    url(r'/(?P<pk>\d+)/update/', UpdateMovieView.as_view()),
    url(r'^/evaluation/create$', CreateEvaluationView.as_view()),
    url(r'/(?P<pk>\d+)/update/', UpdateEvaluationView.as_view()),
    url(r'^/genres/$', ListGenres.as_view()),
]


