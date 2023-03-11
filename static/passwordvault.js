

const data = [
    {
        website:"aaa",
        password: "jkjk"
    },
    {
        website:"aaa",
        password: "kjk"
    }
]


array.forEach((element,i ) => {


const cardcontainer = document.querySelector(".card-container");



//create card
const card  = document.createElement()
card.classList = 'card';
 
const passwordCard = `
<div class="box">
<div class="content">
  <h2>01</h2>
  <h3>Password 1</h3>
  <div class="input-group rounded">
    <input
      type="text"
      class="form-control rounded"
      placeholder=" ${data[i].website}"
      aria-label="Search"
      aria-describedby="search-addon"
    />
    <span class="input-group-text border-0" id="search-addon">
      <i class="fa-solid fa-eye"></i>
    </span>
  </div>
  <div class="input-group rounded">
  <input
    type="password"
    class="form-control rounded"
    placeholder="Password"
    aria-label="Search"
    aria-describedby="search-addon"
  />
  <span class="input-group-text border-0" id="search-addon">
    <i class="fa-solid fa-eye"></i>
  </span>
</div>
  <a href="#">Edit</a>
  <a href="#">Delete</a>
</div>
</div>`;


card.innerHTML+= passwordCrad;
cardcontainer.appendChild(card);
    
});
