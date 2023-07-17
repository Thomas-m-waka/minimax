from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from django.utils import timezone
from django.views import View
from django.views.generic import TemplateView
from django.urls import reverse_lazy

from .models import withvehicle, withoutvehicle


# Home page where the user is redirected
class HomePageView(TemplateView):
    template_name = "index.html"

# People with vehicle registration
class WithVehicle(LoginRequiredMixin, TemplateView):
    template_name = 'with_vehicle.html'
    success_url = reverse_lazy('withvehicle')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['withvehicles'] = withvehicle.objects.order_by('-id')
        return context

    def post(self, request, *args, **kwargs):
        # Retrieve the form data from the POST request
        id_number = request.POST['id_number']
        name = request.POST['name']
        vehicle_registration = request.POST['vehicle_registration']
        phone_number = request.POST['phone_number']
        company = request.POST['company']
        purpose = request.POST['purpose']
        id_picture_front1_base64 = request.POST['id_picture_front1']  # Get the base64-encoded front ID image data
        id_picture_front2_base64 = request.POST['id_picture_front2']  # Get the base64-encoded back ID image data

        # Perform form validation
        errors = {}

        if purpose == 'Other':
            other_purpose = request.POST['other_purpose']
            purpose = f'Other - {other_purpose}'

        # Decode the base64 image data and save it as a file
        id_picture_front1 = None
        id_picture_front2 = None

        if id_picture_front1_base64:
            format, imgstr = id_picture_front1_base64.split(';base64,')
            ext = format.split('/')[-1]
            id_picture_front1 = ContentFile(base64.b64decode(imgstr), name=f"{name}_front1.{ext}")

        if id_picture_front2_base64:
            format, imgstr = id_picture_front2_base64.split(';base64,')
            ext = format.split('/')[-1]
            id_picture_front2 = ContentFile(base64.b64decode(imgstr), name=f"{name}_front2.{ext}")

        try:
            # Create a new withvehicle object and save it to the database
            with_vehicle = withvehicle.objects.create(
                id_number=id_number,
                name=name,
                vehicle_registration=vehicle_registration,
                phone_number=phone_number,
                company=company,
                purpose=purpose,
                time_in=timezone.localtime().time(),
                id_picture_front1=id_picture_front1,
                id_picture_front2=id_picture_front2
            )

            # Notify the user about successful submission
            messages.success(request, 'With Vehicle submitted successfully.')

            # Redirect to the home page
            return redirect('home')
        except Exception as e:
            # Notify the user about the error
            messages.error(request, f'Error: {str(e)}')

            # Redirect back to the form page
            return redirect('withvehicle')


# People without vehicle registration
from django.core.files.base import ContentFile
import base64

# ...

class WithoutVehicle(LoginRequiredMixin, TemplateView):
    template_name = 'without_vehicle.html'
    success_url = reverse_lazy('withoutvehicle')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['withoutvehicles'] = withoutvehicle.objects.order_by('-id')
        return context

    def post(self, request, *args, **kwargs):
        # Retrieve the form data from the POST request
        id_number = request.POST['id_number']
        name = request.POST['name']
        phone_number = request.POST['phone_number']
        company = request.POST['company']
        purpose = request.POST['purpose']
        id_picture_front_base64 = request.POST['id_picture_front']  # Get the base64-encoded front image data
        
        # Perform form validation
        errors = {}

        if purpose == 'Other':
            other_purpose = request.POST['other_purpose']
            purpose = f'Other - {other_purpose}'

        if not id_picture_front_base64:
            errors['id_picture_front'] = 'Please capture the front ID picture.'

        # Decode the base64 image data and save it as a file
        if id_picture_front_base64:
            format, imgstr = id_picture_front_base64.split(';base64,')  # Extract the format and base64 data
            ext = format.split('/')[-1]  # Extract the file extension
            id_picture_front = ContentFile(base64.b64decode(imgstr), name=f"{name}_front.{ext}")  # Create a ContentFile with decoded data
        else:
            id_picture_front = None

        # ...

        try:
            # Create a new withoutvehicle object and save it to the database
            without_vehicle = withoutvehicle.objects.create(
                id_number=id_number,
                name=name,
                phone_number=phone_number,
                company=company,
                purpose=purpose,
                id_picture_front=id_picture_front,
                time_in=timezone.localtime().time()
            )

            # Notify the user about successful submission
            messages.success(request, 'Without Vehicle submitted successfully.')

            # Redirect to the success URL
            return redirect('home')
        except Exception as e:
            # Notify the user about the error
            messages.error(request, f'Error: {str(e)}')

            # Redirect back to the form page
            return redirect('withoutvehicle')


# For updating time for people with vehicles
class UpdateWithVehicleTimeOutView(LoginRequiredMixin, View):
    def post(self, request, *args, **kwargs):
        withvehicle_id = kwargs['withvehicle_id']
        try:
            with_vehicle = withvehicle.objects.get(id=withvehicle_id)
            with_vehicle.time_out = timezone.localtime().time()
            with_vehicle.time_updated = True
            with_vehicle.save()

            # Add success message
            messages.success(request, 'Time Out WithVehicle updated successfully!')

        except withvehicle.DoesNotExist:
            # Add error message
            messages.error(request, 'Failed to update time.')

        return redirect('home')


# For updating time for people without vehicles
class UpdateWithoutVehicleTimeOutView(LoginRequiredMixin, View):
    def post(self, request, *args, **kwargs):
        withoutvehicle_id = kwargs['withoutvehicle_id']
        without_vehicle = withoutvehicle.objects.get(id=withoutvehicle_id)
        without_vehicle.time_out = timezone.localtime().time()
        without_vehicle.time_updated = True
        without_vehicle.save()

        if without_vehicle.time_out is not None:
            # Time updated successfully
            messages.success(request, 'Time Out WithoutVehicle Updated successfully.')
        else:
            # Failed to update time
            messages.error(request, 'Failed to update time.')

        return redirect('home')


# For handling errors
from django.shortcuts import render

def handler404(request, exception):
    return render(request, '404.html')


class ExitWithoutVehicle(LoginRequiredMixin, TemplateView):
    template_name = "exit_withoutvehicle.html"
    success_url = reverse_lazy("ExitWithoutVehicle")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['withoutvehicles'] = withoutvehicle.objects.order_by('-id')
        return context

    def post(self, request, *args, **kwargs):
        # Retrieve the form data from the POST request
        id_number = request.POST.get('id_number')
        name = request.POST.get('name')
        phone_number = request.POST.get('phone_number')
        company = request.POST.get('company')
        purpose = request.POST.get('purpose')
        security_guard_name = request.POST.get('security_guard_name')

        # Retrieve the file from the request
        id_picture_front = request.FILES.get('id_picture_front')

        # Create a new WithoutVehicle object and save it to the database
        without_vehicle = withoutvehicle.objects.create(
            id_number=id_number,
            name=name,
            phone_number=phone_number,
            company=company,
            purpose=purpose,
            security_guard_name=security_guard_name,
            id_picture_front=id_picture_front,  # Associate the file with the attribute
            time_in=timezone.localtime().time()
        )

        # Update the context with the submitted data
        self.extra_context = {'submitted_data': without_vehicle}

        # Redirect to the success URL
        return redirect('ExitWithoutVehicle')

# Exit with vehicle registration
class ExitWithVehicle(LoginRequiredMixin, TemplateView):
    template_name = "exit_withvehicle.html"
    success_url = reverse_lazy('ExitWithVehicle')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['withvehicles'] = withvehicle.objects.order_by('-id')
        return context

    def post(self, request, *args, **kwargs):
        # Retrieve the form data from the POST request
        id_number = request.POST['id_number']
        name = request.POST['name']
        vehicle_registration = request.POST['vehicle_registration']
        phone_number = request.POST['phone_number']
        company = request.POST['company']
        purpose = request.POST['purpose']
        security_guard_name = request.POST['security_guard_name']

        try:
            # Create a new withvehicle object and save it to the database
            with_vehicle = withvehicle.objects.create(
                id_number=id_number,
                name=name,
                vehicle_registration=vehicle_registration,
                phone_number=phone_number,
                company=company,
                purpose=purpose,
                security_guard_name=security_guard_name,
                time_in=timezone.localtime().time()
            )

            # Add a success flash message
            messages.add_message(request, messages.SUCCESS, 'WithVehicle saved successfully.')

        except Exception as e:
            # Add an error flash message
            messages.add_message(request, messages.ERROR, f'Error: {str(e)}')

        # Redirect to the success URL
        return redirect('home')
