// ******************************************************************************************
// ============================       HOMEPAGE      =========================================
// ******************************************************************************************

// ======================== THEME SWITCHER FOR LIGHT/DARK MODE BUTTONS ======================
// ======================== THEME SWITCHER =========================

// buttons
const lightBtn = document.getElementById("light-btn");
const darkBtn  = document.getElementById("dark-btn");

// loading  
if (lightBtn && darkBtn) {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.add("light-theme");
    }

    lightBtn.addEventListener("click", () => {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        localStorage.setItem("theme", "light");
    });

    darkBtn.addEventListener("click", () => {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
    });
}


// ================= ================== ==================
// ================= BACK TO TOP BUTTON ==================
// ================= ================== ==================
const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        backToTopBtn.style.display = (window.scrollY > 300) ? "block" : "none";
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}



// =============== REAL TIME CLOCK IN FOOTER =================
function updateClock() {
    const clock = document.getElementById("clock");
    if (!clock) return;
    const now = new Date();
    clock.textContent = now.toLocaleTimeString("ar-SA");
}
setInterval(updateClock, 1000);
updateClock();


// ******************************************************************************************
// ============================*********************=========================================
// ******************************************************************************************

// ******************************************************************************************
// ============================       JOIN US FORM JS      =========================================
// ******************************************************************************************


// ============================================================================================
// JOIN FORM — CLEAN + FIXED + IMAGE PREVIEW + CUSTOM Alert
// ============================================================================================
// ==========================================
// JOIN US — Required Validation Only (PHASE 3)
// ==========================================

if (!document.querySelector(".members-list")) {

const form = document.getElementById("join-form");
const btn  = document.querySelector(".join-submit");
const photoInput = document.getElementById("photo");
const photoLabel = document.querySelector(".avatar-upload");
const membersListEl = document.querySelector(".members-list");
// const isJoinPageOnly = form && btn && !membersListEl;


// ====== Image preview on upload ======
if (photoInput && photoLabel) {
    photoInput.addEventListener("change", () => {
        const file = photoInput.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => {
                photoLabel.style.backgroundImage = `url('${reader.result}')`;
                photoLabel.style.backgroundSize = "cover";
                photoLabel.style.backgroundPosition = "center";
                photoLabel.textContent = "";
            };
            reader.readAsDataURL(file);
        }
    });
}

function isImage(file) {
    return file && file.type && file.type.startsWith("image/");
}

function fail(msg, element) {
    alert(msg);
    if (element) element.focus();
}

function validate(e) {
    e.preventDefault();
    if (!form) return;
// if (!validateBasicJoinFields(form)) return;

    const first = form.firstName.value.trim();
    const last  = form.lastName.value.trim();
    const email = form.email.value.trim();
    const photo = form.photo.files[0];
    const dob   = form.dob.value;

    // ===== REQUIRED FIELDS =====
    // ===== REQUIRED FIELDS — INDIVIDUAL MESSAGES =====
if (!photo) {
    fail("رجاءً عين صورة.", form.photo);
    return;
}

if (!first) {
    fail("الاسم الأول مطلوب.", form.firstName);
    return;
}

if (!last) {
    fail("الاسم الأخير مطلوب.", form.lastName);
    return;
}

if (!email) {
    fail("البريد الإلكتروني مطلوب.", form.email);
    return;
}

if (!dob) {
    fail("تاريخ الميلاد مطلوب.", form.dob);
    return;
}


    // ===== NAME MUST NOT START WITH NUMBER =====
    if (/^\d/.test(first)) {
        fail("الاسم الأول يجب ألا يبدأ برقم.", form.firstName);
        return;
    }
    if (/^\d/.test(last)) {
        fail("الاسم الأخير  يجب ألا يبدأ برقم.", form.lastName);
        return;
    }

    // ===== PHOTO MUST BE IMAGE =====
    if (!isImage(photo)) {
        fail("حمّل صورة بالصيغة الصحيحة فقط.", form.photo);
        return;
    }

    // ===== DOB MUST BE BEFORE 2008 =====
    const maxDob = new Date("2008-12-31");
    const userDob = new Date(dob);
    if (userDob > maxDob) {
        fail("تاريخ الميلاد يجب ألا يكون بعد 2008.", form.dob);
        return;
    }

// === REQUIRED: AT LEAST ONE EXPERTISE CHECKBOX ===
const expertiseBoxes = form.querySelectorAll('input[name="expertise"]:checked');

if (expertiseBoxes.length === 0) {
    return fail("يجب اختيار مجال خبرة واحد على الأقل.", form.querySelector('input[name="expertise"]'));
}

// === REQUIRED: MAIN SKILL 1 MUST BE FILLED ===
const mainSkill1 = form["skill-main-1"].value.trim();
const sub1_1 = form["skill1-sub1"].value.trim();
const sub1_2 = form["skill1-sub2"].value.trim();

if (!mainSkill1) {
    fail("يجب اختيار مهارة رئيسية واحدة على الاقل", form["skill-main-1"]);
    return;
}

if (!sub1_1 && !sub1_2) {
    fail("يجب تعبئة مهارة فرعية واحدة على الأقل ", form["skill1-sub1"]);
    return;
}

// === REQUIRED: EDUCATION 1 MUST BE FILLED ===
const period1 = form["period1"].value.trim();
const degree1 = form["degree1"].value.trim();

if (!period1) {
    fail("يرجى تعبئة فترة تعليم واحدة على الأقل", form["period1"]);
    return;
}

if (!degree1) {
    fail("يرجى اختيار الدرجة في التعليم الأول.", form["degree1"]);
    return;
}


    // ===== SUCCESS — REQUIRED ALERT =====
    alert(`تم استلام طلب الانضمام.\nشكرًا لك يا ${first} ${last} ❤️`);

    // Reset form
    form.reset();
    photoLabel.style.backgroundImage = "";
    photoLabel.textContent = "+";
}

if (form && btn) {
    form.addEventListener("submit", validate);
    btn.addEventListener("click", validate);
}





}










































// ******************************************************************************************
// ============================*********************=========================================
// ******************************************************************************************

// ******************************************************************************************
// ====================      CUSTOMER DASHBOARD ( SANA'S )       ===================
// ******************************************************************************************
document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    //  Remove Theme Switch from Non-Home Pages
    // ==========================================
    
    // Check if current page is home page
    const isHomePage = window.location.pathname.includes('index.html') || 
                      window.location.pathname === '/' || 
                      window.location.pathname.endsWith('/');
    
    // Remove theme switch if not home page
    if (!isHomePage) {
        const themeSwitch = document.querySelector('.theme-switch');
        if (themeSwitch) {
            themeSwitch.remove(); // Remove element from DOM
        }
    }

    // ==========================================
    //  Request Service Page
    // ==========================================
    
    const requestForm = document.querySelector('.service-form');
    const tailorModes = document.getElementsByName('tp-mode');
    const tailorDropdown = document.querySelector('.tp-dropdown');
    const pickedLabel = document.querySelector('.tp-picked');
    
    // Store session requests
    let sessionRequests = JSON.parse(localStorage.getItem('sessionRequests')) || [];
    
    // 1. Show/hide tailor dropdown
    if (tailorDropdown) {
        tailorDropdown.style.display = 'none';

        for (let i = 0; i < tailorModes.length; i++) {
            tailorModes[i].addEventListener('change', function() {
                if (this.id === 'mode-custom') {
                    tailorDropdown.style.display = 'block'; // Show dropdown
                } else {
                    tailorDropdown.style.display = 'none'; // Hide dropdown
                    pickedLabel.textContent = "";
                    const checkedTailor = document.querySelector('input[name="tailor"]:checked');
                    if(checkedTailor) checkedTailor.checked = false;
                }
            });
        }

        const tailorRadios = document.getElementsByName('tailor');
        for (let i = 0; i < tailorRadios.length; i++) {
            tailorRadios[i].addEventListener('change', function() {
                const nameLabel = this.nextElementSibling; 
                if (nameLabel) {
                    pickedLabel.textContent = " : " + nameLabel.textContent; // Update selected name
                }
            });
        }
    }

    // 2. Handle form submission
    if (requestForm) {
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop page reload

            // Validate form
            const validationResult = validateRequestForm();
            if (!validationResult.isValid) {
                alert(validationResult.message);
                return;
            }

            // Get form data
            const serviceTypeSelect = document.getElementById('req-service-type');
            const serviceName = serviceTypeSelect.options[serviceTypeSelect.selectedIndex].text;
            const description = document.getElementById('req-details').value;
            const phoneNumber = document.getElementById('req-phone').value;
            
            // Create new request object
            const newRequest = {
                id: Date.now(), // Unique ID
                serviceName: serviceName,
                description: description,
                phoneNumber: phoneNumber,
                date: new Date().toLocaleDateString('en-GB'),
                price: "غير محدد",
                status: "pending"
            };

            // Show confirmation message
            const userChoice = confirm(
                "تم إرسال طلبك بنجاح!\n\n" +
                "هل تريد البقاء في هذه الصفحة لإضافة طلبات أخرى؟\n\n" +
                "OK: البقاء في الصفحة وعرض الطلبات المضافة\n" +
                "Cancel: العودة إلى لوحة التحكم"
            );
            
            if (userChoice) {
                // Stay on page - Add request and display it
                sessionRequests.push(newRequest);
                localStorage.setItem('sessionRequests', JSON.stringify(sessionRequests));
                displayAllSessionRequests(); // Show the requests
                requestForm.reset(); // Clear form
                // Reset tailor selection
                if (tailorDropdown) {
                    tailorDropdown.style.display = 'none';
                    pickedLabel.textContent = "";
                    const checkedTailor = document.querySelector('input[name="tailor"]:checked');
                    if(checkedTailor) checkedTailor.checked = false;
                    document.getElementById('mode-random').checked = true;
                }
            } else {
                // Go to dashboard - Clear session requests
                localStorage.removeItem('sessionRequests');
                window.location.href = "dashboard-customer.html"; // Redirect
            }
        });
    }

    // Validate request form
    function validateRequestForm() {
        const serviceTypeSelect = document.getElementById('req-service-type');
        const serviceValue = serviceTypeSelect.value;
        const description = document.getElementById('req-details').value;
        const phoneNumber = document.getElementById('req-phone').value;

        // Check service selected
        if (!serviceValue) {
            return {
                isValid: false,
                message: "خطأ: لم تقم باختيار أي خدمة. الرجاء اختيار خدمة من القائمة."
            };
        }

        // Check phone number format
        const phoneRegex = /^05\d{8}$/;
        if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
            return {
                isValid: false,
                message: "خطأ: رقم الجوال غير صحيح. يجب أن يبدأ بـ 05 ويتكون من 10 أرقام."
            };
        }

        // Check description length
        // Check description length
if (!description || description.length < 100) {
    const missingChars = 100 - (description ? description.length : 0);
    return {
        isValid: false,
        message: `خطأ: وصف الطلب قصير جداً. يحتاج إلى ${missingChars} حرف إضافي على الأقل ليصبح 100 حرف.`
    };
}

        return { isValid: true, message: "" };
    }

    // Display all session requests
    function displayAllSessionRequests() {
        let requestsContainer = document.getElementById('requests-container');
        
        // Create container if not exists
        if (!requestsContainer) {
            requestsContainer = document.createElement('div');
            requestsContainer.id = 'requests-container';
            requestsContainer.style.cssText = 'margin-top: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;';
            
            const title = document.createElement('h3');
            title.textContent = 'الطلبات المضافة خلال هذه الجلسة:';
            requestsContainer.appendChild(title);
            
            if (requestForm && requestForm.parentNode) {
                requestForm.parentNode.insertBefore(requestsContainer, requestForm.nextSibling);
            }
        }

        // Clear and refill container
        const title = requestsContainer.querySelector('h3');
        requestsContainer.innerHTML = ''; // Clear content
        if (title) {
            requestsContainer.appendChild(title); // Add title back
        } else {
            const newTitle = document.createElement('h3');
            newTitle.textContent = 'الطلبات المضافة خلال هذه الجلسة:';
            requestsContainer.appendChild(newTitle);
        }
        
        // Check if no requests
        if (sessionRequests.length === 0) {
            const noRequestsMsg = document.createElement('p');
            noRequestsMsg.textContent = 'لا توجد طلبات مضافة خلال هذه الجلسة.';
            noRequestsMsg.style.textAlign = 'center';
            noRequestsMsg.style.color = '#666';
            requestsContainer.appendChild(noRequestsMsg);
            return;
        }
        
        // Display requests using for loop
        for (let i = 0; i < sessionRequests.length; i++) {
            const request = sessionRequests[i];
            
            // Skip invalid requests
            if (!request || typeof request !== 'object') {
                continue;
            }
            
            const requestCard = document.createElement('div');
            requestCard.className = 'request-card session-request';
            requestCard.style.cssText = 'border: 1px solid #4CAF50; border-radius: 5px; padding: 10px; margin: 10px 0; background-color: #f0f8f0;';
            
            requestCard.innerHTML = `
                <div class="request-details">
                    <p><strong>طلب #${i + 1}</strong></p>
                    <p><strong>اسم الخدمة:</strong> ${request.serviceName || 'غير محدد'}</p>
                    <p><strong>وصف الطلب:</strong> ${request.description || 'لا يوجد وصف'}</p>
                    <p><strong>رقم الجوال:</strong> ${request.phoneNumber || 'غير متوفر'}</p>
                    <p><strong>تاريخ الإضافة:</strong> ${request.date || 'غير محدد'}</p>
                    <p><strong>الحالة:</strong> ${request.status === 'pending' ? 'قيد الانتظار' : 'مكتمل'}</p>
                </div>
            `;
            
            requestsContainer.appendChild(requestCard); // Add to page
        }
    }

    // Load session requests on page load
    function loadSessionRequests() {
        if (requestForm) {
            // Clean corrupted data
            try {
                const storedRequests = localStorage.getItem('sessionRequests');
                sessionRequests = storedRequests ? JSON.parse(storedRequests) : [];
                
                // Filter valid requests
                sessionRequests = sessionRequests.filter(request => 
                    request && typeof request === 'object' && request.id
                );
                
                localStorage.setItem('sessionRequests', JSON.stringify(sessionRequests));
                
            } catch (error) {
                sessionRequests = [];
                localStorage.removeItem('sessionRequests');
            }
            
            // Display requests if there are any (user stayed on page)
            if (sessionRequests.length > 0) {
                displayAllSessionRequests();
            }
        }
    }
    
    loadSessionRequests();

    // ==========================================
    //  Clear session requests when leaving the page
    // ==========================================
    
    // Clear session requests when user navigates away from the request service page
    window.addEventListener('beforeunload', function() {
        if (requestForm) {
            localStorage.removeItem('sessionRequests');
        }
    });

    // ==========================================
    //  Customer Dashboard - No dynamic requests
    // ==========================================
    
    // Only show original 3 requests from HTML

    // ==========================================
    //  Service Evaluation Page
    // ==========================================

    const evalForm = document.querySelector('#evaluate-service form');
    
    if (evalForm) {
        // Map services to dates and prices
        const serviceData = {
            's1': { date: '2025/10/20', price: '25 ر.س' },  // Dress alteration
            's2': { date: '2025/10/25', price: '45 ر.س' },  // Tablecloth embroidery
            's3': { date: '2025/10/18', price: '25 ر.س' }   // Quick repair
        };

        // Update date/price when service changes
        const serviceSelect = document.getElementById('eval-service-name');
        if (serviceSelect) {
            serviceSelect.addEventListener('change', function() {
                updateServiceDetails(this.value);
            });
            
            // Update on page load if service selected
            if (serviceSelect.value) {
                updateServiceDetails(serviceSelect.value);
            }
        }

        // Update service details function
        function updateServiceDetails(serviceValue) {
            const serviceInfo = serviceData[serviceValue];
            const dateField = document.getElementById('eval-date');
            const priceField = document.getElementById('eval-price');
            
            if (serviceInfo && dateField && priceField) {
                dateField.value = serviceInfo.date; // Update date
                priceField.value = serviceInfo.price; // Update price
            }
        }

        evalForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop page reload
            
            // Validate form
            const validationResult = validateEvaluationForm();
            if (!validationResult.isValid) {
                alert(validationResult.message);
                return;
            }

            // Get form data
            const rating = document.querySelector('input[name="rating"]:checked');
            const comment = document.getElementById('eval-comment').value;
            const serviceSelect = document.getElementById('eval-service-name');
            const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;

            // Show message based on rating
            if (parseInt(rating.value) >= 4) {
                alert("شكراً لك على تقييمك الجيد!\n\nنقدر ملاحظاتك وسنعمل على الاستمرار في تقديم أفضل الخدمات.");
            } else {
                alert("نعتذر عن تجربتك غير المرضية.\n\nسنعمل على تحسين خدماتنا بناءً على ملاحظاتك.");
            }
            
            // Reset form
            evalForm.reset();
            resetFieldHighlights();
            
            // Reset date and price fields
            const dateField = document.getElementById('eval-date');
            const priceField = document.getElementById('eval-price');
            if (dateField && priceField) {
                dateField.value = '2025/10/20';
                priceField.value = '25 ر.س';
            }
            
            // Redirect to dashboard after 1 second
            setTimeout(function() {
                window.location.href = "dashboard-customer.html";
            }, 1000);
        });

        // Add highlighting for empty fields
        const formInputs = evalForm.querySelectorAll('select, textarea');
        for (let i = 0; i < formInputs.length; i++) {
            formInputs[i].addEventListener('blur', function() {
                validateField(this);
            });
            
            formInputs[i].addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '#4CAF50'; // Green border
                    this.style.backgroundColor = '';
                }
            });
        }

        // Highlight rating stars
        const ratingInputs = document.querySelectorAll('input[name="rating"]');
        for (let i = 0; i < ratingInputs.length; i++) {
            ratingInputs[i].addEventListener('change', function() {
                const starRating = document.querySelector('.star-rating');
                if (starRating) {
                    starRating.style.border = '';
                    starRating.style.backgroundColor = '';
                }
            });
        }
    }

    // Validate evaluation form
    function validateEvaluationForm() {
        const serviceSelect = document.getElementById('eval-service-name');
        const rating = document.querySelector('input[name="rating"]:checked');
        const comment = document.getElementById('eval-comment').value;
        
        let errorFields = [];
        resetFieldHighlights();

        // Check service selected
        if (!serviceSelect.value) {
            serviceSelect.style.border = '2px solid red';
            serviceSelect.style.backgroundColor = '#ffe6e6';
            errorFields.push("اختيار الخدمة");
        }

        // Check rating selected
        if (!rating) {
            const starRating = document.querySelector('.star-rating');
            if (starRating) {
                starRating.style.border = '2px solid red';
                starRating.style.backgroundColor = '#ffe6e6';
            }
            errorFields.push("التقييم (عدد النجوم)");
        }

        // Check comment exists
        if (!comment.trim()) {
            document.getElementById('eval-comment').style.border = '2px solid red';
            document.getElementById('eval-comment').style.backgroundColor = '#ffe6e6';
            errorFields.push("التعليق أو الملاحظات");
        }

        // Show error if form invalid
        if (errorFields.length > 0) {
            return {
                isValid: false,
                message: "الرجاء ملء جميع الحقول المطلوبة:\n\n- " + errorFields.join('\n- ')
            };
        }

        return { isValid: true, message: "" };
    }

    // Validate single field
    function validateField(field) {
        if (!field.value.trim()) {
            field.style.border = '2px solid red'; // Red border
            field.style.backgroundColor = '#ffe6e6'; // Red background
        } else {
            field.style.borderColor = ''; // Clear border
            field.style.backgroundColor = ''; // Clear background
        }
    }

    // Reset field highlighting
    function resetFieldHighlights() {
        const formInputs = document.querySelectorAll('#evaluate-service select, #evaluate-service textarea');
        for (let i = 0; i < formInputs.length; i++) {
            formInputs[i].style.borderColor = '';
            formInputs[i].style.backgroundColor = '';
        }
        
        const starRating = document.querySelector('.star-rating');
        if (starRating) {
            starRating.style.border = '';
            starRating.style.backgroundColor = '';
        }
    }

});

















































































































// ******************************************************************************************
// ============================*********************=========================================
// ******************************************************************************************

// ******************************************************************************************
// ====================      CUSTOMER DASHBOARD ( ALBATOOL'S )       ===================
// ******************************************************************************************





// ترتيب خدمات صفحة services.html
document.addEventListener("DOMContentLoaded", function () {

    // نتأكد أن الصفحة تحتوي على عناصر خدمات
    if (!document.querySelector(".services-list")) {
        return;
    }

    var container = document.getElementById("servicesList");
    if (!container) return;

    var htmlItems = container.getElementsByClassName("service-item");
    var cards = [];

    // نحفظ كروت الخدمات في مصفوفة
    for (var i = 0; i < htmlItems.length; i++) {
        cards.push(htmlItems[i]);
    }

    // إعادة رسم العناصر حسب الترتيب المطلوب
    function render(list) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        for (var i = 0; i < list.length; i++) {
            container.appendChild(list[i]);
        }
    }

    function getName(card) {
        var el = card.querySelector(".service-name");
        return el ? el.textContent.trim() : "";
    }

    function getPrice(card) {
        var el = card.querySelector(".service-price");
        if (!el) return 0;
        var num = parseInt(el.textContent, 10);
        if (isNaN(num)) num = 0;
        return num;
    }

    // خلط عشوائي لعرض الخدمات بترتيب مختلف في كل مرة
    function shuffle(arr) {
        var a = arr.slice();
        for (var i = 0; i < a.length; i++) {
            var j = Math.floor(Math.random() * a.length);
            var t = a[i];
            a[i] = a[j];
            a[j] = t;
        }
        return a;
    }

    // عند تحميل الصفحة أول مرة
    render(shuffle(cards));

    // التعامل مع قائمة الفرز
    var select = document.getElementById("sort-select");
    if (!select) return;

    select.addEventListener("change", function () {
        var value = select.value;
        var sorted = cards.slice();

        if (value === "name-a-z") {
            sorted.sort(function (a, b) {
                return getName(a).localeCompare(getName(b), "ar");
            });
        }
        else if (value === "name-z-a") {
            sorted.sort(function (a, b) {
                return getName(b).localeCompare(getName(a), "ar");
            });
        }
        else if (value === "price-low-high") {
            sorted.sort(function (a, b) {
                return getPrice(a) - getPrice(b);
            });
        }
        else if (value === "price-high-low") {
            sorted.sort(function (a, b) {
                return getPrice(b) - getPrice(a);
            });
        }

        render(sorted);
    });
});

































































































// ******************************************************************************************
// ============================*********************=========================================
// ******************************************************************************************

// ******************************************************************************************
// ====================      SERVICE PROVIDER DASHBOARD ( LEEN'S )       ===================
// ******************************************************************************************



// ===============================
// تحميل خدمات مقدم الخدمة
// ===============================
// ===============================
// تحميل خدمات مقدم الخدمة
// ===============================
function loadProviderServices() {
    const container = document.getElementById("providerServices");
    if (!container) return;

    // نحفظ الخدمات القديمة
    let existingCards = container.innerHTML;

    let services = JSON.parse(localStorage.getItem("services")) || [];

    if (services.length === 0) {
        container.innerHTML = existingCards + `<p class="no-services">لا توجد خدمات مضافة بعد.</p>`;
        return;
    }

    // نولّد الخدمات الجديدة
    let newCards = services.map(service => `
        <article class="service-card-square">
            <img src="${service.photo}" alt="${service.name}" class="service-square-img">
            <h3>${service.name}</h3>
            <p class="service-price">
                السعر: <span>${service.price} رس</span>
            </p>
            <p>${service.description}</p>
        </article>
    `).join("");

    // ندمج القديم + الجديد
    container.innerHTML = existingCards + newCards;
}

// ===============================
// معاينة صورة الخدمة قبل الإضافة
// ===============================
const serviceImageInput = document.getElementById("serviceImage");
const uploadDrop = document.querySelector(".upload-drop");

if (serviceImageInput && uploadDrop) {
    serviceImageInput.addEventListener("change", function () {
        const file = serviceImageInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function () {
            uploadDrop.style.backgroundImage = `url('${reader.result}')`;
            uploadDrop.style.backgroundSize = "cover";
            uploadDrop.style.backgroundPosition = "center";
            uploadDrop.innerHTML = "";  // يشيل أيقونة الكاميرا
        };
        reader.readAsDataURL(file);
    });
}

// ===============================
// إضافة خدمة جديدة
// ===============================
function addNewService() {
    const form = document.getElementById("addServiceForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("serviceName").value.trim();
        const price = document.getElementById("servicePrice").value.trim();
        const desc = document.getElementById("serviceDesc").value.trim();
        const photoInput = document.getElementById("serviceImage");

        if (!name || !price || !desc || !photoInput.files[0]) {
            alert("يرجى تعبئة جميع الحقول.");
            return;
        }

        if (/^\d/.test(name)) {
            alert("اسم الخدمة لا يمكن أن يبدأ برقم.");
            return;
        }

        if (!/^\d+(\.\d+)?$/.test(price)) {
            alert("السعر يجب أن يكون رقمًا.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function () {
            const newService = {
                name: name,
                price: price,
                description: desc,
                photo: reader.result
            };

            const services = JSON.parse(localStorage.getItem("services")) || [];
            services.push(newService);
            localStorage.setItem("services", JSON.stringify(services));

            alert(`تمت إضافة الخدمة: ${name}`);
            form.reset();

            window.location.href = "dashboard-service-provider.html";
        };

        reader.readAsDataURL(photoInput.files[0]);
    });
}

// ===============================

// ===============================
// DOM READY
// ===============================
document.addEventListener("DOMContentLoaded", function () {
   

    loadProviderServices();
    addNewService();

    const membersListEl = document.querySelector(".members-list");
    const deleteBtn = document.querySelector(".members-actions .btn");
    const joinSubmitBtn = document.querySelector(".join-submit");

    if (!membersListEl || !deleteBtn || !joinSubmitBtn) {
        return;
    }

    const STORAGE_KEY = "gurzah_members";
    let members = [];

    function loadMembers() {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {
            try {
                members = JSON.parse(stored) || [];
            } catch (e) {
                members = [];
            }
        } else {
            members = Array.from(
                membersListEl.querySelectorAll(".member-row")
            ).map((row, index) => {
                const nameEl = row.querySelector(".member-name");
                const avatarEl = row.querySelector(".member-avatar");

                return {
                    id: Date.now() + index,
                    name: nameEl ? nameEl.textContent.trim() : "عضو",
                    avatar: avatarEl
                        ? avatarEl.getAttribute("src")
                        : "images/user-placeholder.png",
                };
            });

            saveMembers();
        }
    }

    function saveMembers() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    }

    function renderMembers() {
        membersListEl.innerHTML = "";

        if (!members.length) {
            membersListEl.innerHTML =
                '<p style="padding:10px; text-align:center; color:#7a5a66;">لا يوجد أعضاء حالياً.</p>';
            return;
        }

        members.forEach(function (member) {
            const row = document.createElement("div");
            row.className = "member-row";

            row.innerHTML = `
                <img class="member-avatar" src="${member.avatar}" alt="عضو الفريق">
                <div class="member-name">${member.name}</div>
                <input type="checkbox" class="member-checkbox" data-id="${member.id}">
            `;

            membersListEl.appendChild(row);
        });
    }
   

  function validateJoinForm() {
        const firstNameInput = document.getElementById("firstName");
        const lastNameInput = document.getElementById("lastName");
        const emailInput = document.getElementById("email");

        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();

        if (!firstName || !lastName || !email) {
            alert("الرجاء تعبئة الاسم الأول، الاسم الأخير، والبريد الإلكتروني.");
            return false;
        }

        const startsWithNumber = /^\d/;
        if (startsWithNumber.test(firstName) || startsWithNumber.test(lastName)) {
            alert("الاسم لا يمكن أن يبدأ برقم.");
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("الرجاء إدخال بريد إلكتروني صحيح.");
            return false;
        }

        return true;
    }

    
    joinSubmitBtn.addEventListener("click", function (e) {
        e.preventDefault();
    
        const joinForm = document.querySelector(".join-card");
    
if (!validateJoinForm()) {
    return;
}
    

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const fullName = firstName + " " + lastName;

        const newMember = {
            id: Date.now(),
            name: fullName,
            avatar: ""
        };

        const photoInput = document.getElementById("photo");

        if (photoInput && photoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function () {
                newMember.avatar = reader.result;
                members.push(newMember);
                saveMembers();
                renderMembers();
                alert("تمت إضافة العضو الجديد بنجاح: " + fullName);
                if (joinForm) joinForm.reset();
            };
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            newMember.avatar = "images/user-placeholder.png";
            members.push(newMember);
            saveMembers();
            renderMembers();
            alert("تمت إضافة العضو الجديد بنجاح: " + fullName);
            if (joinForm) joinForm.reset();
        }
    });
    
    deleteBtn.addEventListener("click", function () {
        const checkedBoxes = membersListEl.querySelectorAll(
            ".member-checkbox:checked"
        );

        if (!checkedBoxes.length) {
            alert("الرجاء اختيار عضو واحد على الأقل لحذفه.");
            return;
        }

        if (!confirm("هل أنت متأكد من حذف الأعضاء المحددين؟")) {
            return;
        }

        const idsToDelete = Array.from(checkedBoxes).map(function (cb) {
            return Number(cb.getAttribute("data-id"));
        });

        members = members.filter(function (member) {
            return !idsToDelete.includes(member.id);
        });

        saveMembers();
        renderMembers();

        alert("تم حذف الأعضاء المحددين بنجاح.");
    });

    loadMembers();
    renderMembers();
});













































































































// ******************************************************************************************
// ============================*********************=========================================
// ******************************************************************************************

// ******************************************************************************************
// =================================      EXTRA FUNCTIONALITY JS       ======================
// ******************************************************************************************

/* ================================
   FAVORITE TAILORS — GLOBAL SYSTEM
   ================================ */

// نجيب بيانات المفضلة من التخزين
let favTailors = JSON.parse(localStorage.getItem("favTailors")) || [];

// ========== 1) تشغيل القلوب داخل صفحات البروفايل ==========
(function handleProfileFavorite() {

    // اسم الصفحة الحالي
    const page = window.location.pathname;

    // جدول ربط الصفحة باسم الخياط
    const map = {
        "azzam-profile.html": "azzam",
        "remas-profile.html": "remas",
        "khaled-profile.html": "khaled",
        "lamia-profile.html": "lamia",
        "nouf-profile.html": "nouf",
        "saad-profile.html": "saad"
    };

    // نحدد الخياط الحالي بناءً على اسم الصفحة
    const file = page.split("/").pop();
    const key = map[file];
    if (!key) return; // مو صفحة خياط

const checkbox = document.querySelector(`[data-key="${key}"]`);
    if (!checkbox) return;

    // لو الخياط مفضل مسبقاً — فعّل القلب
    checkbox.checked = favTailors.includes(key);

    // عند الضغط على القلب — نحفظ في localStorage
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            if (!favTailors.includes(key)) favTailors.push(key);
        } else {
            favTailors = favTailors.filter(f => f !== key);
        }
        localStorage.setItem("favTailors", JSON.stringify(favTailors));
    });

})();
 

// ========== 2) ترتيب الخياطين داخل صفحة طلب الخدمة ==========
(function handleRequestPageFavorites() {

    // لو مو داخل request-service.html — اطلع
    if (!window.location.pathname.includes("request-service")) return;

    // نجيب القائمة
    const list = document.querySelector(".tp-list");
    if (!list) return;

    // نحول كل li إلى array
    const items = Array.from(list.querySelectorAll(".tp-item"));
// نلوّن القلوب داخل صفحة طلب الخدمة حسب الموجود في localStorage
items.forEach(li => {
    const favCheckbox = li.querySelector(".tp-fav input[type='checkbox']");
    const key = favCheckbox?.dataset.key;

    if (!key) return;

    // لو الخياط موجود في المفضلة عدّل حالة القلب
    if (favTailors.includes(key)) {
        favCheckbox.checked = true;
    } else {
        favCheckbox.checked = false;
    }
});

    // نقسمهم → مفضلين فوق + عاديين تحت
    const favItems = [];
    const normalItems = [];

    items.forEach(li => {
        const label = li.querySelector(".tp-name");
        if (!label) return;
       const key = li.dataset.key;
if (favTailors.includes(key)) favItems.push(li);

        else normalItems.push(li);
    });

    // نرسم القائمة من جديد
    list.innerHTML = "";
    favItems.forEach(i => list.appendChild(i));
    normalItems.forEach(i => list.appendChild(i));

})();
