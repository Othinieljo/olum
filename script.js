const data = [
    { label: "Spag X1 ", value: "200F (Spaguetti)" },
    { label: "Savon X1 ", value: "200F (Savon X 1)" },
    { label: "Huile X1 ", value: "200F (Huile X 1" },
    { label: "Riz ", value: "300F (Riz)" },
    { label: "Spag X2 ", value: "300F (Spaguetti)" },
    { label: "Combo 1", value: "1000F (Riz + huile + savon)" },
    { label: "Huile X2 ", value: "500F (Huile)" },
    { label: "Savon X2 ", value: "500F (Savon)" },
    { label: "Combo 2", value: "2000F (Huile + Riz)" },
    { label: "Riz ", value: "700F (Riz)" },
    { label: "Combo 3", value: "1500F (Riz + huile + savon)" },
    { label: "T-shirt", value: "T-shirt Sentinelle offert" },
  ];
  
  var padding = { top: 20, right: 40, bottom: 0, left: 0 },
      w = document.getElementById('chart').clientWidth - padding.left - padding.right,
      h = document.getElementById('chart').clientHeight - padding.top - padding.bottom,
      r = Math.min(w, h) / 2,
      rotation = 0,
      oldrotation = 0,
      picked = 100000,
      oldpick = [],
      spins = 0, // Nombre de tours effectués
      maxSpins = 10, // Nombre maximum de tours autorisés
      color = d3.scale.ordinal().range(["#2C3E50", "#8E44AD", "#2980B9", "#16A085", "#F39C12", "#D35400", "#C0392B", "#7F8C8D", "#27AE60", "#E74C3C", "#3498DB", "#9B59B6"]); // Bleu marine chic
  
  var svg = d3.select('#chart')
      .append("svg")
      .data([data])
      .attr("width", w + padding.left + padding.right)
      .attr("height", h + padding.top + padding.bottom);
  
  var container = svg.append("g")
      .attr("class", "chartholder")
      .attr("transform", "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")");
  
  var vis = container.append("g");
  
  var pie = d3.layout.pie().sort(null).value(function(d) { return 1; });
  
  var arc = d3.svg.arc().outerRadius(r);
  
  var arcs = vis.selectAll("g.slice")
      .data(pie)
      .enter()
      .append("g")
      .attr("class", "slice");
  
  arcs.append("path")
      .attr("fill", function(d, i) { return color(i); })
      .attr("d", function(d) { return arc(d); });
  
  arcs.append("text").attr("transform", function(d) {
          d.innerRadius = 0;
          d.outerRadius = r;
          d.angle = (d.startAngle + d.endAngle) / 2;
          return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
      })
      .attr("text-anchor", "end")
      .text(function(d, i) {
          return data[i].label;
      })
      .style("font-family", "Poppins, Helvetica, Arial, sans-serif")
      .style("font-size", "3vw");
  
  container.on("click", spin);
  
  function spin(d) {
      if (spins >= maxSpins) { // Vérifie le nombre de tours effectués
          alert("Vous avez atteint le nombre maximal de tours autorisés.");
          return;
      }
  
      container.on("click", null);
      spins++; // Incrémente le nombre de tours effectués
  
      if (oldpick.length == data.length - 1) { // Exclude the T-shirt section
          container.on("click", null);
          return;
      }
  
      var ps = 360 / data.length,
          pieslice = Math.round(1440 / data.length),
          rng;
      do {
          rng = Math.floor((Math.random() * 1440) + 360);
      } while ((rng % 360) >= 331 && (rng % 360) <= 360); // Exclude the T-shirt segment
  
      rotation = (Math.round(rng / ps) * ps);
      picked = Math.round(data.length - (rotation % 360) / ps);
      picked = picked >= data.length ? (picked % data.length) : picked;
  
      if (picked === data.length - 1 || oldpick.indexOf(picked) !== -1) {
          d3.select(this).call(spin);
          return;
      } else {
          oldpick.push(picked);
      }
  
      rotation += 90 - Math.round(ps / 2);
  
      vis.transition()
          .duration(3000)
          .attrTween("transform", rotTween)
          .each("end", function() {
              d3.select("#question h1")
                  .text("Vous offrez : " + data[picked].value);
              oldrotation = rotation;
              document.getElementById("dpt").style.display = "block";
              document.getElementById("don-btn").style.display = "block";

            // Scroller jusqu'à la section de dépôt
            document.getElementById("dpt").scrollIntoView({ behavior: "smooth" });
  
              container.on("click", spin);
          });
  }
  
  var arrowPadding = r - 20;
  
  svg.append("g")
      .attr("transform", "translate(" + (w / 2 + padding.left) + "," + ((h / 2) + padding.top) + ")")
      .append("path")
      .attr("d", "M" + arrowPadding + ",0L" + (arrowPadding + 20) + ",20L" + (arrowPadding + 20) + ",-20Z")
      .style({ "fill": "black" });
  
  var buttonRadius = Math.min(w, h) * 0.1;
  
  container.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", buttonRadius)
      .style({ "fill": "white", "cursor": "pointer" });
  
  container.append("text")
      .attr("x", 0)
      .attr("y", buttonRadius / 3)
      .attr("text-anchor", "middle")
      .text("JOUER")
      .style({ "font-weight": "bold", "font-size": buttonRadius / 2 + "px" });
  
  function rotTween() {
      var i = d3.interpolate(oldrotation % 360, rotation);
      return function(t) {
          return "rotate(" + i(t) + ")";
      };
  }
  
  document.getElementById("next").addEventListener("click", function(){
    document.getElementById("chart").scrollIntoView({ behavior: "smooth" });
    // console.log("gfgg");
    // alert("Erreur lors de la copie du numéro.");
    // console.log("ddd");
    
  })
  // Ajout du bouton "Fais le don" et gestion de l'envoi du message WhatsApp
  document.getElementById("don-btn").addEventListener("click", function() {
      var selectedValue = data[picked].value;
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

//   document.getElementById("next").addEventListener("touchend", function() {
//     document.getElementById("chart").scrollIntoView({ behavior: "smooth" });
//     console.log("ddd");
// });