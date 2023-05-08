
function searchClicked()
{
   let form=document.getElementById("searchForm");
   if(form)
   {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        form.submit()
   });

   }

}