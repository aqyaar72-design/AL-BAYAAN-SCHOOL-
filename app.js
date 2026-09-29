const {createClient}=supabase;
const client=createClient(window.SUPABASE_URL,window.SUPABASE_PUBLISHABLE_KEY);

const menuBtn=document.getElementById("menuBtn");
const nav=document.getElementById("nav");
menuBtn.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded",String(open));
});
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();

document.getElementById("registrationForm").addEventListener("submit",async e=>{
  e.preventDefault();
  const status=document.getElementById("formStatus");
  status.textContent="Diiwaangelinta waa la dirayaa...";
  status.style.color="#0b6848";
  const fd=new FormData(e.target);
  const payload={
    full_name:String(fd.get("full_name")||"").trim(),
    phone:String(fd.get("phone")||"").trim(),
    email:String(fd.get("email")||"").trim()||null,
    course:fd.get("course"),
    message:String(fd.get("message")||"").trim()||null
  };
  const {error}=await client.from("student_registrations").insert(payload);
  if(error){
    console.error(error);
    status.textContent="Diiwaangelintu ma dirmin. Fadlan telefoon ama WhatsApp nala soo xiriir.";
    status.style.color="#b42318";
    return;
  }
  e.target.reset();
  status.textContent="Mahadsanid! Diiwaangelintaada waa la helay.";
  status.style.color="#0b6848";
});
