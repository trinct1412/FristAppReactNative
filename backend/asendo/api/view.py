from asendo.api.serialize import GenresSerializer, MovieSerializer,EvaluationSerializer
import pandas as pd
import numpy as np
from sendo.settings import OPTION_RECOMMEND
from ..models import Movie, Genres,Evaluation
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import (
    CreateAPIView,
    UpdateAPIView,
    ListAPIView,
)
from sendo.permission import IsOwnWeb


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 1000


def open_csv(path):
    if not path:
        return pd.read_csv(OPTION_RECOMMEND, encoding='latin-1', header=None)
    return pd.read_csv(path)


def get_items_rec_user(u_id):
    data = open_csv(path=None).values[1:]
    user_col = 0
    item_col = 1
    users = data[:, user_col]
    ids = np.where(users == str(u_id))[0].astype(np.int32)
    item_ids = data[ids, item_col]
    return list(item_ids.astype(np.int32))


class ListGenres(ListAPIView):
    serializer_class = GenresSerializer
    queryset = Genres.objects.all()
    pagination_class = None

    def get_queryset(self):
        return Genres.get_items()


class ListMovieView(ListAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        name = self.request.query_params.get('name')
        u_id = self.request.query_params.get('uid')
        c_id = self.request.query_params.get('c_id')
        if u_id is not None:
            list_ids = get_items_rec_user(u_id=u_id)
            if list_ids is not None:
                return Movie.get_items_ids(list_ids)
        if name is not None:
            return Movie.get_item_name(name=name)
        if c_id is not None:
            return Movie.get_item_genres(c_id=c_id)
        return Movie.get_items()


class CreateMovieView(CreateAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    permission_classes = (IsOwnWeb,)

    def perform_create(self, serializer):
        try:
            serializer.save()
        except Exception as e:
            pass


class UpdateMovieView(UpdateAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    permission_classes = (IsOwnWeb,)

    def perform_update(self, serializer):
        serializer.save()


class CreateEvaluationView(CreateAPIView):
    serializer_class = EvaluationSerializer
    queryset = Evaluation.objects.all()
    permission_classes = (IsOwnWeb,)

    def perform_create(self, serializer):
        try:
            serializer.save()
        except Exception as e:
            pass


class UpdateEvaluationView(UpdateAPIView):
    serializer_class = EvaluationSerializer
    queryset = Evaluation.objects.all()
    permission_classes = (IsOwnWeb,)

    def perform_update(self, serializer):
        serializer.save()
