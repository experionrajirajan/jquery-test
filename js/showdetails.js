function showDetails() {
    var projectdetails=JSON.parse(localStorage.getItem('prodetails'));
    console.log(projectdetails);
                  var newRow = jQuery('<tr><td>'+projectdetails.pname+'</td><td>'+projectdetails.pcode+'</td><td>'+projectdetails.currency+'</td><td>'+projectdetails.customer+'</td><td>'+projectdetails.type+'</td><td>'+projectdetails.mgr+'</td><td>'+projectdetails.pstatus+'</td><td>'+projectdetails.pstartdate+'</td><td>'+projectdetails.penddate+'</td></tr>');
            jQuery('table#myTable').append(newRow);
            
     
}
function clearLocalstorage() {
    localStorage.clear();
}