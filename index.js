let modal = document.getElementById("myModal");
let paymentModal = document.getElementById("paymentModal");


// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let close1 = document.getElementsByClassName("close")[0];
let close2 = document.getElementsByClassName("close")[1];
const montantForm = document.getElementById('montantForm');
const montantInput = document.getElementById('montant');

// When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }
btn.addEventListener("click",() =>{
   modal.showModal();
   
   
});


// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }
close1.addEventListener("click", () => {
    modal.close()
})
close2.addEventListener("click", () => {
    paymentModal.close()
})
montantForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let montant = montantInput.value;
    montantConfirmation.textContent = montant;
    modal.close();
    paymentModal.showModal();
    document.getElementById("dpt").style.display = "block";
    document.getElementById("don-btn").style.display = "block";
});
document.getElementById("don-btn").addEventListener("click", function() {
    var selectedValue = montantInput.value;
    var phoneNumber = "+2250151616169"; // Remplacez par le numéro WhatsApp souhaité
    var message = "Je fais don de " + selectedValue;
    var whatsappUrl = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
    window.open(whatsappUrl, "_blank");
});
document.getElementById("copy-btn").addEventListener("click", function() {
  var phoneNumber = document.getElementById("phone-number").textContent;
  navigator.clipboard.writeText(phoneNumber).then(function() {
      // alert("Numéro copié : " + phoneNumber);
  }, function() {
      // alert("Erreur lors de la copie du numéro.");
  });
});

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
// window.addEventListener("click", () => {
//     if (event.target == modal){
//         modal.style.display = "none"
//     }
// })