// Copy M-Pesa number to clipboard
function copyMpesaNumber() {
	navigator.clipboard.writeText('0794233751').then(function() {
		alert('M-Pesa number copied!');
	}, function(err) {
		alert('Failed to copy number.');
	});
}

// Group code gate
function checkGroupCode() {
	var code = document.getElementById('group-code').value.trim();
	var error = document.getElementById('gate-error');
	if (code === 'VCT47 K Town') {
		document.getElementById('gate-modal').style.display = 'none';
		document.getElementById('age-modal').style.display = 'flex';
	} else {
		error.textContent = 'Incorrect code. Access denied.';
	}
}

// Age verification modal
function confirmAge() {
	document.getElementById('age-modal').style.display = 'none';
	document.getElementById('site-content').style.display = 'block';
}

// Show QR code after payment
function showQRCode() {
	fetch('http://localhost:3000/generate-qr', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
	})
	.then(response => response.json())
	.then(data => {
		document.getElementById('qr-img').src = data.qr;
		document.getElementById('qr-code-value').textContent = 'Code: ' + data.code;
		document.getElementById('qr-section').style.display = 'block';
		document.getElementById('thankyou-modal').style.display = 'none';
	})
	.catch(() => {
		document.getElementById('qr-section').innerHTML = '<p>Failed to generate QR code. Please contact support.</p>';
	});
}

// Hide site after payment and show QR code
function showThankYou() {
	document.getElementById('site-content').style.display = 'none';
	document.getElementById('thankyou-modal').style.display = 'flex';
	setTimeout(showQRCode, 2000);
}

// Detect PayPal form submit
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('site-content').style.display = 'none';
	document.getElementById('thankyou-modal').style.display = 'none';
	document.getElementById('age-modal').style.display = 'none';
	document.getElementById('gate-modal').style.display = 'flex';
	var paypalForm = document.getElementById('paypal-form');
	if (paypalForm) {
		paypalForm.addEventListener('submit', function() {
			setTimeout(showThankYou, 1000);
		});
	}
});

// M-Pesa paid button
function mpesaPaid() {
	showThankYou();
}
