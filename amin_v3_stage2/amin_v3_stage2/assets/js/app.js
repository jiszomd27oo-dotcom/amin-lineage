document.querySelectorAll('.hamburger').forEach(btn=>{btn.addEventListener('click',()=>document.querySelector('.nav')?.classList.toggle('open'))});
const online=document.querySelector('.status dl dd:last-child');
if(online){let n=386;setInterval(()=>{n+=Math.floor(Math.random()*5)-2;if(n<320)n=386;online.textContent=n+' 人'},3000)}
