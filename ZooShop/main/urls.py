from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, re_path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    re_path(r'^$', views.index, name='home'),

    re_path(r'^products/$', views.products, name='products'),
    re_path(r'^products/create$', views.product_create, name='product_create'),
    re_path(r'^products/(?P<id>\d+)/$', views.ProductDetailsView.as_view(), name='product_info'),
    re_path(r'^products/(?P<id>\d+)/update/$', views.product_update, name='product_update'),
    re_path(r'^products/(?P<id>\d+)/delete/$', views.product_delete, name='product_delete'),

    # re_path(r'^category/$', views.category, name='category'),

    re_path(r'^purchases/$', views.purchases, name='purchases'),
    re_path(r'^purchases/create$', views.purchase_create, name='purchase_create'),

    re_path(r'^suppliers/$', views.suppliers, name='suppliers'),
    re_path(r'^suppliers/(?P<id>\d+)/$', views.SupplierDetailsView.as_view(), name='supplier_info'),

    re_path(r'^static_info/$', views.statistics, name='static_info'),

    re_path(r'^register/$', views.register, name='register'),
    re_path(r'^login/$', auth_views.LoginView.as_view(), name='login'),
    re_path(r'^logout/$', auth_views.LogoutView.as_view(), name='logout'),

    re_path(r'^profile/(?P<id>\d+)/$', views.ShowProfilePageView.as_view(), name='profile'),

    re_path(r'^about_us/$', views.about, name='about_us'),
    re_path(r'our_products', views.our_products, name='our_products'),
    # re_path(r'our_products/(?P<id>.+)/$', views., name='news_info'),
    re_path(r'news/$', views.news, name='news-detail'),
    re_path(r'news/(?P<id>.+)/$', views.NewsDetailView.as_view(), name='news_info'),

    re_path(r'faq/$', views.faq, name='faq'),

    re_path(r'vacancy/$', views.vacancy, name='vacancy'),
    re_path(r'sales/$', views.sales, name='sales'),
    # re_path(r'vacancy/$', views.vacancy, name='vacancy'),
    re_path(r'feedback_create/$', views.feedback_create, name='feedback_create'),

    re_path(r'trash/$', views.trash, name='trash'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
