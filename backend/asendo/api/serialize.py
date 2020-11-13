from rest_framework import serializers
from ..models import Movie, Evaluation, Genres


class EvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluation
        fields = '__all__'
        read_only_fields = ['id', ]

    def create(self, validated_data):
        evaluation = Evaluation(
            user=validated_data['user'],
            movie=validated_data['movie'],
            evaluation_index=validated_data['evaluation_index'],
            date_watch=validated_data['date_watch'],
        )
        evaluation.save()
        return evaluation

    def update(self, instance, validated_data):
        if validated_data['evaluation_index']:
            instance.evaluation_index = validated_data['evaluation_index']
        instance.save()
        return instance


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'
        read_only_fields = ['id', ]

    def create(self, validated_data):
        movie = Movie(
            name=validated_data['name'],
            imdbid=validated_data['imdbid'],
            href=validated_data['href'],
            year=validated_data['year'],
            rated=validated_data['rated'],
            release=validated_data['release'],
            runtime=validated_data['runtime'],
            write=validated_data['write'],
            actor=validated_data['actor'],
            plot=validated_data['plot'],
            language=validated_data['language'],
            country=validated_data['country'],
            awards=validated_data['awards'],
            poster=validated_data['poster'],
            genres=validated_data['genres'],
        )
        movie.save()
        return movie

    def update(self, instance, validated_data):
        if validated_data['name']:
            instance.name = validated_data['name']
        if validated_data['imdbid']:
            instance.imdbid = validated_data['imdbid']
        if validated_data['href']:
            instance.href = validated_data['href']
        if validated_data['year']:
            instance.year = validated_data['year']
        if validated_data['rated']:
            instance.rated = validated_data['rated']
        if validated_data['release']:
            instance.release = validated_data['release']
        if validated_data['runtime']:
            instance.runtime = validated_data['runtime']
        if validated_data['write']:
            instance.write = validated_data['write']
        if validated_data['actor']:
            instance.actor = validated_data['actor']
        if validated_data['plot']:
            instance.plot = validated_data['plot']
        if validated_data['language']:
            instance.language = validated_data['language']
        if validated_data['country']:
            instance.country = validated_data['country']
        if validated_data['awards']:
            instance.awards = validated_data['awards']
        if validated_data['poster']:
            instance.poster = validated_data['poster']
        if validated_data['genres']:
            instance.genres = validated_data['genres']
        instance.save()
        return instance


class GenresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genres
        fields = '__all__'
