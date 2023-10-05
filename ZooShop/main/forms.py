from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms

from main.models import Profile, Product, Purchase, Feedback


class UserProfileCreationForm(UserCreationForm):


    # email = forms.EmailField()
    birthdate = forms.DateField(
        required=True,
        help_text="Введите вашу дату рождения (DD/MM/YYYY)",
        widget=forms.DateInput(attrs={'type': 'date'}),
        validators=[]
    )

    def save(self, *args, **kwargs):
        user = super().save(*args, **kwargs)

        if user and not Profile.objects.filter(user=user).exists():
            # phone = self.cleaned_data['phone']
            # address = self.cleaned_data['address']
            birthdate = self.cleaned_data['birthdate']

            Profile.objects.create(
                user=user,
                birthdate=birthdate
            )

        return user

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'birthdate', 'password1', 'password2']


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['phone', 'address', 'icon']



class ProductCreateForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'price', 'category', 'image']


class ProductUpdateForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'price', 'category', 'image']


class ProductDeleteForm(forms.Form):
    confirm = forms.BooleanField(
        required=True,
        initial=False,
        widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}),
    )


class PurchaseCreateForm(forms.ModelForm):
    class Meta:
        model = Purchase
        fields = ['product', 'supplier', 'quantity', 'date']
        price = forms.DecimalField(widget=forms.HiddenInput())

class FeedbackCreateForm(forms.ModelForm):
    class Meta:
        model = Feedback
        fields = ['product', 'user', 'discription', 'rating']
