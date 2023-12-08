import calendar
import numpy as np
from datetime import datetime, date

from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.sites import requests
from django.db.models import Min, F, IntegerField, Avg
from django.shortcuts import render, redirect

# Create your views here.
from django.http import Http404, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.utils import timezone
from django.views import View, generic

from main.forms import UserProfileCreationForm, ProductUpdateForm, ProductDeleteForm, PurchaseCreateForm, \
    ProductCreateForm, FeedbackCreateForm
from main.models import Product, Category, Profile, Purchase, Supplier, News, Faq, Employee, Vacancy, Sales, \
    Feedback, Company
from plotly.graph_objects import Bar, Layout, Figure


# Create your views here.

def index(request):
    category = Category.objects.all().order_by('order')

    last_news = News.objects.last()
    latest_news = News.objects.order_by('-date')[:3]
    # for i in range(n):
    # latest_news =
    n = range(100)
    context = {
        'category': category,
        'last_news': last_news,
        'latest_news': latest_news,
        'n': n
    }

    return render(request, 'home.html', context)
    # return render(request, 'home.html')


def products(request):
    category_id = request.GET.get('category', None)
    if category_id:
        categor = Category.objects.get(pk=category_id)
        products = Product.objects.filter(category=categor)
    else:
        products = Product.objects.all()
    category = Category.objects.all()

    price_from = request.GET.get('price_from')
    price_to = request.GET.get('price_to')

    #for p in products:
    sort_by = request.GET.get('sort_by', 'name')
    if sort_by == 'price_asc':
        products = products.order_by('price')
    elif sort_by == 'price_desc':
        products = products.order_by('-price')
    elif sort_by == 'name':
        products = products.order_by('name')

    price_max = products.order_by('-price').first()

    if price_from and price_to:
        products = products.filter(price__gte=price_from, price__lte=price_to)

    selected_categories = request.GET.getlist('category')
    if 'all' not in selected_categories and selected_categories:
        products = products.filter(category__in=selected_categories)
    content = {
        'products': products,
        'category': category,
        'price_max': price_max,
        'category_id': category_id,
    }
    return render(request, 'products.html', content)

def product_create(request):
    if request.method == 'POST':
        form = ProductCreateForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('products')
    else:
        form = ProductCreateForm()
    return render(request, 'product_create.html', {'form': form})

class ProductDetailsView(View):
    @staticmethod
    def get(request, id):
        try:
            product = Product.objects.get(id=id)
        except Product.DoesNotExist:
            raise Http404("Product doesn't exist :(")

        return render(
            request,
            'product_info.html',
            context={'product': product, }
        )

def product_update(request, id):
    product = Product.objects.get(id=id)
    if request.method == 'POST':
        form = ProductUpdateForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('product_info', id=id)
    else:
        form = ProductUpdateForm()
    return render(request, 'product_update.html', {'form': form, 'product': product})

def product_delete(request, id):
    product = Product.objects.get(id=id)
    if request.method == 'POST':
        form = ProductDeleteForm(request.POST)
        if form.is_valid() and form.cleaned_data['confirm']:
            product.delete()
            return redirect('product_info', id=id)
    else:
        form = ProductDeleteForm()
    return render(request, 'product_delete.html', {'form': form, 'product': product})

def category(request):
    category = Category.objects.all()
    return render(request, 'category.html', {'category': category, })


def calculate_age(birthdate):
    today = date.today()
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age


def register(request):
    if request.method == 'POST':
        form = UserProfileCreationForm(request.POST)
        if form.is_valid():
            birthdate = form.cleaned_data['birthdate']
            age = calculate_age(birthdate)
            if age > 18:
                user = form.save()
                # profile = Profile(user=user)
                # profile.save()
                return redirect('login')
            else:
                form.add_error('birthdate', 'Пользователю должно быть больше 18 лет.')
    else:
        form = UserProfileCreationForm()

    return render(request, 'registration/register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home.html')
    else:
        pass
    return render(request, 'registration/login.html')

def logout_view(request):
    logout(request)  # Вызываем метод logout
    return redirect('home.html')


class ShowProfilePageView(View):
    # model = Profile

    @staticmethod
    def get(request, id):
        try:
            user = User.objects.get(id=id)
            profile = Profile.objects.get(user=user)



            # profile = Profile.objects.get(id=id)
            # user = User.objects.get(profile=profile)
            # profile_url = reverse('profile', args=[id])
        except Profile.DoesNotExist:
            raise Http404("Profile doesn't exist :(")

        return render(
            request,
            'profile.html',
            context={'profile': profile, 'user': user}
        )


def purchases(request):
    purchases = Purchase.objects.all()
    # purchases_product = Purchase.product.objects.all()

    content = {
        'purchases': purchases,
        # 'purchases_product': purchases_product
    }
    return render(request, 'purchases.html', content)

def purchase_create(request):
    if request.method == 'POST':
        form = PurchaseCreateForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('purchases')
    else:
        form = PurchaseCreateForm()
    return render(request, 'purchase_add.html', {'form': form})



@login_required
def suppliers(request):
    profile = Profile.objects.get(user=request.user)

    # Получить всех поставщиков, связанных с профилем пользователя
    suppliers = profile.supplier.all()

    return render(request, 'suppliers.html', {'suppliers': suppliers})


class SupplierDetailsView(View):
    @staticmethod
    def get(request, id):
        try:
            supplier = Supplier.objects.get(id=id)
            products = supplier.product.all()
        except Supplier.DoesNotExist:
            raise Http404("Product doesn't exist :(")

        return render(
            request,
            'supplier_info.html',
            context={'supplier': supplier, 'products': products}
        )



def about(request):
    profiles = Profile.objects.all()
    feedback = Feedback.objects.all()
    # profile = Profile.objects.get(profiles)
    # suppliers = profile.supplier.all()
    return render(request, 'about_us.html', {'profiles': profiles, 'feedback': feedback})


class NewsDetailView(View):
    @staticmethod
    def get(request, id):
        try:
            news = News.objects.get(id=id)
        except Product.DoesNotExist:
            raise Http404("Product doesn't exist :(")

        return render(
            request,
            'news_info.html',
            context={'news': news, }
        )


def news(request):
    news = News.objects.all()
    return render(request, 'news.html', {'news': news, })


def faq(request):
    faq = Faq.objects.all()
    return render(request, 'faq.html', {'faq': faq, })


def vacancy(request):
    vacancy = Vacancy.objects.all()
    return render(request, 'vacancy.html', {'vacancy': vacancy, })

@login_required
def sales(request):
    sales = Sales.objects.filter(user=request.user)

    return render(request, 'sales.html', {'sales': sales, })

def feedback_create(request):
    if request.method == 'POST':
        form = FeedbackCreateForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('about_us')
    else:
        form = FeedbackCreateForm()
    return render(request, 'feedback_create.html', {'form': form})


def trash(request):
    # Получить текущую дату и время в тайм-зоне пользователя
    user_timezone_datetime = timezone.localtime(timezone.now())

    # Получить текущую дату и время в UTC
    utc_datetime = timezone.now()

    now = datetime.now()
    year = now.year
    month = now.month
    cal = calendar.month(year, month)

    context = {
        'user_timezone_datetime': user_timezone_datetime,
        'utc_datetime': utc_datetime,
        'calendar': cal,
    }
    return render(request, 'trash.html', context)


def statistics(request):
    profiles = Profile.objects.all()

    ages = []

    for p in profiles:
        age = p.age()
        if age is not None:
            ages.append(age)

    average_age = np.mean(ages)
    median_age = np.median(ages)


    suppliers = Supplier.objects.all()
    suppliers_types = list(Supplier.objects.values_list('company_name', flat=True))

    purchases_all = []

    for s in suppliers:
        purchases = Purchase.objects.filter(supplier=s)

        count = 0
        for p in purchases:
            count += p.quantity

        purchases_all.append(count)

    data = Bar(x=suppliers_types, y=purchases_all,
               marker=dict(color=['pink', 'gray', 'white']))
    layout = Layout(title='Suppliers and their general purchases',
                    xaxis=dict(title='suppliers'),
                    yaxis=dict(title='general purchases'))
    fig = Figure(data=data, layout=layout)
    plot_div = fig.to_html(full_html=False)

    content = {
        'profiles': profiles,
        'average_age': average_age,
        'median_age': median_age,
        'plot_div': plot_div,
    }
    return render(request, 'static_info.html', content)


def our_products(request):
    number = range(300)

    company = Company.objects.get(name='Petix')
    products = Product.objects.filter(company=company)

    # try:
    #     service = Service.objects.get(id=id)
    #     service_price = service.price
    # except Service.DoesNotExist:
    #     raise Http404("Service doesn't exist :(")
    # return render(
    #     request,
    #     'CosmetologyApp/service_detail.html',
    #     context={'service': service,
    #              'service_price': service_price}
    # )

    product = Product.objects.get(name='Petix Vegetable meat')
    product_price = product.price

    coupons = Sales.objects.filter(user=request.user)
    coupon = Sales.objects.filter(discription='Happy New Year')

    # promo_code = request.GET.get(article='664')
    # try:
    #     promo = Sales.objects.get(product=promo_code)
    #     discount = promo.persent
    # except Sales.DoesNotExist:
    #     discount = 0

    content = {
        'number': number,
        'products': products,
        'coupons': coupons,
        'coupon': coupon,
        # 'discount': discount,
        'product': product,
        'product_price': product_price
    }
    return render(request, 'our_products.html', content)