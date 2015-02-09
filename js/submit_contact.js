$(document).ready(function(){
    
    $('#form_submitted').hide();
    $('#uploading').hide();

    $.validator.addMethod("phoneUS", function(phone_number, element) {
            var reg = /^\(?[2-9]\d{2}[\)\.-]?\s?\d{3}[\s\.-]?\d{4}$/
            return reg.test(phone_number);
    }, "Invalid phone number. " );
    
    $("#contact_form").validate({
            rules: {
                    fname: { required: true },
                    lname: { required:true },
                    email: {
                            required: true,
                            email: true
                    },
                    phone: {
                            required: true,
                            phoneUS: true
                    }
            },
            messages: {
                    fname: { required: "Please enter your first name. " },
                    lname: { required: "Please enter your last name. " },
                    email: {
                            required: "Please enter your email address. ",
                            email: "Invalid email address. "
                    },
                    phone: {
                            required: "Please enter your phone number. "
                    }
            },
            errorLabelContainer: "#error",
            errorElement:"em",
            highlight: function(element, errorClass) {
                    $(element).fadeIn(function() {
                            $(element).addClass('form_error');
                    });
            },
            unhighlight: function(element, errorClass) {
                    $(element).fadeIn(function() {
                            $(element).removeClass('form_error');
                    });
            },
            submitHandler: function(form) {
                    $(form).ajaxSubmit({
                            beforeSubmit: uploading,
                            success:   submitted  // post-submit callback 
                    });
                    return false;
            }
    });
    

    function uploading() {
        $('#uploading').show();
    }

    function submitted(data) {
            $('#uploading').hide();
            
            if (data == "submitted") {
                    $('#form_submitted').show();
                    $('#form_content').hide();
            }
            else
            {
                    $('#error').css("display", "inline");
                    $('#error').html('<em htmlfor="fname" class="error">There was an error submitting your form. Please try again.'+data+' </em>');
            }
    }
});