# import graphene
# from graphene_django.types import DjangoObjectType
# from .models import Item, InVoice, DetailInVoice, User
# from graphene import relay
# import pandas as pd
# import numpy as np
# from sendo.settings import OPTION_RECOMMEND
#
#
# def open_csv(path):
#     if not path:
#         return pd.read_csv(OPTION_RECOMMEND, encoding='latin-1', header=None)
#     return pd.read_csv(path)
#
#
# def get_items_rec_user(u_id):
#     data = open_csv(path=None).values[1:]
#     user_col = 0
#     item_col = 1
#     users = data[:, user_col]
#     ids = np.where(users == str(u_id))[0].astype(np.int32)
#     item_ids = data[ids, item_col]
#     return list(item_ids.astype(np.int32))
#
#
# class ItemType(DjangoObjectType):
#     class Meta:
#         model = Item
#         fields = '__all__'
#         filter_fields = ['name', ]
#         interfaces = (relay.Node,)
#
#
# class ItemConnection(relay.Connection):
#     class Meta:
#         node = ItemType
#
#
# class UserType(DjangoObjectType):
#     class Meta:
#         model = User
#         fields = '__all__'
#
#
# class InvoiceType(DjangoObjectType):
#     class Meta:
#         model = InVoice
#         fields = '__all__'
#         interfaces = (relay.Node,)
#
#
# class InVoiceConnection(relay.Connection):
#     class Meta:
#         node = InvoiceType
#
#
# class DetailInvoiceType(DjangoObjectType):
#     class Meta:
#         model = DetailInVoice
#         fields = '__all__'
#
#
# class Query(graphene.ObjectType):
#     item = graphene.Field(ItemType, id=graphene.Int())
#     items = relay.ConnectionField(ItemConnection, name=graphene.String(), u_id=graphene.Int())
#     all_invoices = relay.ConnectionField(InVoiceConnection, u_id=graphene.Int())
#     user = graphene.Field(UserType, u_id=graphene.Int())
#     detailinvoices = graphene.List(DetailInvoiceType)
#
#     def resolve_item(self, info, **kwargs):
#         id = kwargs.get('id')
#         if id is not None:
#             return Item.get_item(id=id)
#         return None
#
#     def resolve_items(self, info, **kwargs):
#         name = kwargs.get('name')
#         u_id = kwargs.get('u_id')
#
#         if u_id:
#             list_ids = get_items_rec_user(u_id=u_id)
#             if list_ids is not None:
#                 return Item.get_items_ids(list_ids)
#
#         if name is not None:
#             return Item.get_item_name(name=name)
#         return Item.get_items()
#
#     def resolve_customer(self, info, **kwargs):
#         u_id = kwargs.get('u_id')
#         if u_id is not None:
#             return User.get_invoices_customer(u_id=u_id)
#         return None
#
#     def resolve_all_incoives(self, info, **kwargs):
#         return InVoice.objects.select_related('customer').all()
#
#     def resolve_detailinvoices(self, info, **kwargs):
#         return DetailInVoice.objects.select_related('invoice').all()
#
