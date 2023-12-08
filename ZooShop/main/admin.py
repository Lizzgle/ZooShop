from django.contrib import admin
from .models import Supplier, Product, Category, Customer, Purchase, Employee, Profile, News, Faq, Vacancy, \
    Sales, Feedback, Company


# Register your models here.


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass

@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    pass

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass

@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    pass


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass

@admin.register(Company)
class SupplierAdmin(admin.ModelAdmin):
    pass

admin.site.register(News)
admin.site.register(Faq)
admin.site.register(Vacancy)
admin.site.register(Sales)
admin.site.register(Feedback)