import datetime
# Create your models here.
import uuid
from enum import Enum
from profile import Profile

from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
from django.db import models
from django.utils import timezone


# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=30, unique=True)
    order = models.PositiveIntegerField(default=0)

    image = models.ImageField(upload_to='category_images/')

    class Meta:
        ordering = ['order']

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"


    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=65, unique=True)
    article = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='product_images/')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    # quantity = models.PositiveIntegerField(null=True, default=0)

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def __str__(self):
        return self.name

def validate_birthdate(birthdate):
    today = datetime.date.today()
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    if age < 18:
        raise ValidationError("Вы должны быть старше 18 лет.")


def get_ages(birthdate):
    today = datetime.date.today()
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age


class Profile(models.Model):
    phone_regex = RegexValidator(
        regex=r'^\+375 \(\d{2}\) \d{7}$',
        message="Phone number must be in the format: '+375 29 XXXXXXX'"
    )


    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)


    phone = models.CharField(max_length=20, validators=[phone_regex],
                             help_text="Enter a phone in format +375 (29) XXX-XX-XX")

    address = models.CharField(max_length=64)

    icon = models.ImageField(upload_to='profile_icons/', default='profile_icons/default_profile_icon.png')

    supplier = models.ManyToManyField('Supplier', null=True)

    birthdate = models.DateField(null=True, validators=[validate_birthdate])

    # age = get_ages(birthdate)

    def age(self):
        if self.birthdate:
            today = datetime.date.today()
            age = today.year - self.birthdate.year - (
                        (today.month, today.day) < (self.birthdate.month, self.birthdate.day))
            return age
        else:
            return None

    def __str__(self):
        return f'{self.user.username} Profile'

    class Meta:
        verbose_name = "profile"
        verbose_name_plural = "profiles"




class Employee(User):
    pass

class Supplier(models.Model):
    phone_regex = RegexValidator(
        regex=r'^\+375 \d{2} \d{7}$',
        message="Phone number must be in the format: '+375 29 XXXXXXX'"
    )

    company_name = models.CharField(max_length=30)
    address = models.CharField(max_length=30)
    phone = models.CharField(max_length=15, validators=[phone_regex], default='+375 29 XXXXXXX')

    product = models.ManyToManyField(Product)
    # employee = models.ManyToManyField('Employee', null=True)

    class Meta:
        verbose_name = "Supplier"
        verbose_name_plural = "Suppliers"

    def __str__(self):
        return self.company_name




class Customer(models.Model):
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    username = models.CharField(max_length=30, unique=True)

    class Meta:
        verbose_name = "Customer"
        verbose_name_plural = "Customers"

    def __str__(self):
        return f'{self.name} {self.surname}'


class Purchase(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    supplier = models.ForeignKey(Supplier, on_delete=models.DO_NOTHING, null=True)
    quantity = models.PositiveIntegerField()
    date = models.DateField()
    price = Product.price

    class Meta:
        verbose_name = "Purchase"
        verbose_name_plural = "Purchases"

    def __str__(self):
        return f"{self.product}"

class News(models.Model):
    title = models.CharField(max_length=64, blank=True)
    little_content = models.TextField(null=True)
    content = models.TextField()
    date = models.DateField(null=True)
    image = models.ImageField(upload_to='news_images/', null=True)

    class Meta:
        verbose_name = "news"
        verbose_name_plural = "news"

    def __str__(self):
        return self.title

class Faq(models.Model):
    date = models.DateTimeField(auto_now_add=True, editable=False)

    title = models.CharField(max_length=64, blank=True)
    content = models.TextField()

    def __str__(self):
        return self.title

    def date__str__(self):
        return f'{self.date.day}.{self.date.month}.{self.date.year}'
#
# class Schedule(Enum):
#     12hours_2_2 = 1
#     8hours_5_2 = 2
#     4hours_5_2 = 3


class Vacancy(models.Model):
    name = models.CharField(max_length=155)
    salary = models.PositiveIntegerField()
    discription = models.TextField()

class Sales(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # new_price = models.IntegerField()
    discription = models.TextField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    to_date = models.DateField()

class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    discription = models.TextField()
    date = models.DateTimeField(auto_now_add=True, editable=False)
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
