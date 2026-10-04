(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(e){if(e.ep)return;e.ep=!0;const i=n(e);fetch(e.href,i)}})();const x="lokarena_ticketing_data_v1",I=[{id:"evt-2026-001",slug:"seminar-inovasi-bisnis-2026",title:"Seminar Inovasi & Bisnis 2026",tagline:"Ide besar. Langkah nyata.",category:"Seminar & Workshop",type:"offline",timezone:"WIB",start_at:"2026-10-24T09:00:00+07:00",end_at:"2026-10-24T16:00:00+07:00",date_display:"24 Oktober 2026",time_display:"09.00–16.00 WIB",publication_status:"published",capacity:500,venue:"Lokarena Hall",address:"Jl. Sudirman Kav. 28, Karet Semanggi",city:"Jakarta Selatan",maps_url:"https://maps.google.com",online_access_ref:null,organizer_name:"Lokarena Management",description:"Satu hari untuk mengeksplorasi ide, belajar dari praktisi, dan membangun koneksi dengan pelaku bisnis. Bawa tantanganmu, pulang dengan langkah yang bisa diterapkan.",speakers:[{name:"Maya Putri",role:"Business Strategy",portraitIndex:0},{name:"Arif Pratama",role:"Digital Innovation",portraitIndex:1},{name:"Nadia Rahma",role:"Entrepreneurship",portraitIndex:2}],agenda:[{time:"09.00",title:"Opening & keynote",note:"Mengubah ide menjadi peluang"},{time:"11.00",title:"Diskusi bersama praktisi",note:"Strategi bisnis yang bisa dijalankan"},{time:"13.30",title:"Workshop & networking",note:"Dari insight ke rencana aksi"}]},{id:"evt-2026-002",slug:"workshop-ai-product-engineering",title:"Hands-on AI & Cloud Engineering",tagline:"Build Scalable Intelligent Systems",category:"Workshop",type:"hybrid",timezone:"WIB",start_at:"2026-11-14T10:00:00+07:00",end_at:"2026-11-14T17:00:00+07:00",date_display:"14 November 2026",time_display:"10.00–17.00 WIB",publication_status:"published",capacity:200,venue:"Lokarena Tech Hub & Zoom Webinar",address:"Jl. Rasuna Said Blok X, Kuningan",city:"Jakarta Selatan",online_access_ref:"https://webinar.lokarena.id/join/ai-eng-2026",organizer_name:"Lokarena Tech Circle",description:"Pelajari arsitektur agen AI, LLM orchestration, dan deployment cloud production-ready dengan studi kasus nyata.",speakers:[{name:"Reza Firmansyah",role:"Principal AI Architect",portraitIndex:1},{name:"Citra Dewi",role:"Cloud Platform Lead",portraitIndex:2}],agenda:[{time:"10.00",title:"Modern Agentic Architecture",note:"Tools, reasoning, and context optimization"},{time:"13.00",title:"Production LLM Pipelines",note:"Caching, latency, and reliability at scale"},{time:"15.30",title:"Live Deployment Hackathon",note:"Hands-on cloud build"}]},{id:"evt-2026-003",slug:"tech-founders-gathering-2026",title:"Indonesia Tech Founders Gathering",tagline:"Exclusive Networking & Insights",category:"Gathering",type:"offline",timezone:"WIB",start_at:"2026-12-05T18:00:00+07:00",end_at:"2026-12-05T21:30:00+07:00",date_display:"5 Desember 2026",time_display:"18.00–21.30 WIB",publication_status:"published",capacity:120,venue:"Grand Sky Lounge",address:"SCBD Lot 11",city:"Jakarta",maps_url:"https://maps.google.com",online_access_ref:null,organizer_name:"Lokarena Leadership Forum",description:"Sesi temu eksklusif para founder, CEO, dan tech leaders untuk bertukar insight seputar scaling, hiring, dan fundraising.",speakers:[{name:"Handoko Tan",role:"Venture Partner",portraitIndex:0},{name:"Gita Pramesti",role:"Serial Tech Founder",portraitIndex:2}],agenda:[{time:"18.00",title:"Dinner & Casual Mingling",note:"Exclusive welcoming dinner"},{time:"19.15",title:"Fireside Chat: Sustainable Growth",note:"Navigating unit economics in 2027"},{time:"20.30",title:"Closed-door Networking",note:"Peer connections"}]}],T=[{id:"tt-001",event_id:"evt-2026-001",name:"Regular Pass",price_idr:25e4,quota:350,allocated:2,reserved:0,min_per_order:1,max_per_order:4,visible:!0,description:"Akses satu hari penuh sesi seminar & workshop",benefits:["Seluruh sesi seminar & workshop","Materi digital & kit peserta","Lunch & coffee break","E-Sertifikat resmi"]},{id:"tt-002",event_id:"evt-2026-001",name:"VIP Networking Pass",price_idr:5e5,quota:50,allocated:0,reserved:0,min_per_order:1,max_per_order:2,visible:!0,description:"Akses prioritas, tempat duduk depan & VIP dinner lounge",benefits:["Semua benefit Regular Pass","Tempat duduk baris terdepan (Front Row)","VIP exclusive dinner bersama pembicara","Goodie bag eksklusif Lokarena"]},{id:"tt-003",event_id:"evt-2026-001",name:"Komunitas / Pelajar (Gratis)",price_idr:0,quota:100,allocated:0,reserved:0,min_per_order:1,max_per_order:2,visible:!0,description:"Tiket beasiswa khusus perwakilan komunitas & mahasiswa",benefits:["Akses sesi utama seminar","Materi digital","E-Sertifikat kehadiran"]},{id:"tt-004",event_id:"evt-2026-002",name:"Online Stream Only",price_idr:15e4,quota:150,allocated:0,reserved:0,min_per_order:1,max_per_order:4,visible:!0,description:"Akses siaran langsung berkualitas tinggi & rekaman",benefits:["Akses webinar interaktif via Zoom","Akses rekaman sesi 30 hari","Source code & repository materi"]},{id:"tt-005",event_id:"evt-2026-002",name:"In-Person Workshop",price_idr:45e4,quota:50,allocated:0,reserved:0,min_per_order:1,max_per_order:2,visible:!0,description:"Tatap muka langsung dengan mentor di Lokarena Tech Hub",benefits:["Hands-on lab terbimbing langsung","Mentoring arsitektur 1-on-1","Lunch & merchandise"]},{id:"tt-006",event_id:"evt-2026-003",name:"Executive Invite",price_idr:75e4,quota:120,allocated:0,reserved:0,min_per_order:1,max_per_order:2,visible:!0,description:"Akses lengkap gathering eksklusif, networking, dan gourmet dinner",benefits:["Akses private lounge","Fine dining & beverages","Networking directory akses"]}],S=[{id:"vch-001",code:"LOKA20",kind:"percentage",value:20,max_discount:1e5,min_spend:1e5,usage_limit:100,used_count:0,per_email_limit:1,active:!0,description:"Diskon 20% khusus perayaan peluncuran Lokarena (Maks. Rp100.000)"},{id:"vch-002",code:"HEMAT50K",kind:"fixed",value:5e4,max_discount:5e4,min_spend:25e4,usage_limit:50,used_count:0,per_email_limit:1,active:!0,description:"Potongan langsung Rp50.000 untuk transaksi minimal Rp250.000"}],C=[{id:"ord-seed-001",number:"ORD-20261004-000123",event_id:"evt-2026-001",buyer_name:"Budi Santoso",buyer_email:"budi@example.com",buyer_phone:"081234567890",subtotal:25e4,discount:0,fee:0,total:25e4,status:"confirmed",payment_status:"succeeded",payment_method:"Virtual Account BCA",expires_at:"2026-10-04T12:00:00Z",created_at:"2026-10-04T08:30:00+07:00",paid_at:"2026-10-04T08:35:00+07:00",policy_version:"terms_v1"},{id:"ord-seed-002",number:"ORD-20261004-000122",event_id:"evt-2026-001",buyer_name:"Sari Putri",buyer_email:"sari@example.com",buyer_phone:"081298765432",subtotal:25e4,discount:5e4,fee:0,total:2e5,status:"confirmed",payment_status:"succeeded",payment_method:"QRIS",expires_at:"2026-10-04T12:00:00Z",created_at:"2026-10-04T08:15:00+07:00",paid_at:"2026-10-04T08:18:00+07:00",policy_version:"terms_v1"}],$=[{id:"att-seed-001",order_id:"ord-seed-001",slot_index:0,name:"Budi Santoso",email:"budi@example.com",phone:"081234567890"},{id:"att-seed-002",order_id:"ord-seed-002",slot_index:0,name:"Sari Putri",email:"sari@example.com",phone:"081298765432"}],B=[{id:"tix-seed-001",order_id:"ord-seed-001",attendee_id:"att-seed-001",event_id:"evt-2026-001",ticket_type_id:"tt-001",public_code:"TIX-DEMO-001",qr_token_hash:"LK-QR-89F7A23B19E04D",status:"valid",issued_at:"2026-10-04T08:35:00+07:00"},{id:"tix-seed-002",order_id:"ord-seed-002",attendee_id:"att-seed-002",event_id:"evt-2026-001",ticket_type_id:"tt-001",public_code:"TIX-DEMO-002",qr_token_hash:"LK-QR-12C59D80E3FA71",status:"valid",issued_at:"2026-10-04T08:18:00+07:00"}],A=[{id:"chk-seed-001",ticket_id:"tix-seed-002",event_id:"evt-2026-001",staff_id:"stf-01",staff_name:"Dian Permana",checked_in_at:"2026-10-04T09:12:00+07:00",method:"scan",reason:null}],D=[{id:"aud-001",actor:"Super Admin",action:"EVENT_PUBLISH",entity_type:"event",entity_id:"evt-2026-001",details:"Event Seminar Inovasi & Bisnis 2026 published",created_at:"2026-10-01T10:00:00+07:00"},{id:"aud-002",actor:"Staff Dian",action:"CHECK_IN_SCAN",entity_type:"ticket",entity_id:"tix-seed-002",details:"Checked in attendee Sari Putri (TIX-DEMO-002) via QR Scanner",created_at:"2026-10-04T09:12:00+07:00"}];class R{constructor(){this.data=this.loadData(),this.listeners=new Set,this.startReservationExpiryWorker()}loadData(){try{const a=localStorage.getItem(x);if(a)return JSON.parse(a)}catch(a){console.warn("Could not read from localStorage, using seed defaults:",a)}return{events:I,ticketTypes:T,orders:C,attendees:$,tickets:B,checkIns:A,vouchers:S,auditLogs:D}}saveData(){try{localStorage.setItem(x,JSON.stringify(this.data))}catch(a){console.error("Failed to write to localStorage:",a)}this.notify()}subscribe(a){return this.listeners.add(a),()=>this.listeners.delete(a)}notify(){this.listeners.forEach(a=>a(this.data))}resetToDefault(){localStorage.removeItem(x),this.data={events:I,ticketTypes:T,orders:C,attendees:$,tickets:B,checkIns:A,vouchers:S,auditLogs:D},this.saveData()}startReservationExpiryWorker(){setInterval(()=>{this.checkAndExpireOrders()},1e4)}checkAndExpireOrders(){const a=new Date().getTime();let n=!1;this.data.orders.forEach(t=>{if(t.status==="pending_payment"&&t.expires_at){const e=new Date(t.expires_at).getTime();a>e&&(t.status="expired",t.payment_status="expired",n=!0,this.releaseReservation(t.id),this.logAudit("System Expiry Worker","ORDER_EXPIRED","order",t.id,`Order ${t.number} expired automatically. Inventory and voucher reservations released.`))}}),n&&this.saveData()}releaseReservation(a){const n=this.data.orders.find(t=>t.id===a);if(n&&(n.items&&n.items.forEach(t=>{const e=this.data.ticketTypes.find(i=>i.id===t.ticket_type_id);e&&e.reserved>=t.quantity&&(e.reserved-=t.quantity)}),n.voucher_code)){const t=this.data.vouchers.find(e=>e.code.toUpperCase()===n.voucher_code.toUpperCase());t&&t.used_count>0&&t.used_count--}}logAudit(a,n,t,e,i){const o={id:"aud-"+Date.now()+"-"+Math.floor(Math.random()*1e3),actor:a||"Super Admin",action:n,entity_type:t,entity_id:e,details:i,created_at:new Date().toISOString()};this.data.auditLogs.unshift(o)}calculateQuote(a,n,t="",e=""){if(!this.data.events.find(c=>c.id===a))throw new Error("Event tidak ditemukan");let o=0;const s=[];n.forEach(c=>{const r=this.data.ticketTypes.find(g=>g.id===c.ticketTypeId);if(!r)throw new Error(`Jenis tiket ID ${c.ticketTypeId} tidak valid`);const k=r.quota-r.allocated-(r.reserved||0);if(c.quantity>k)throw new Error(`Stok ${r.name} tidak mencukupi (tersisa ${k})`);const v=r.price_idr*c.quantity;o+=v,s.push({ticketTypeId:r.id,name:r.name,unitPrice:r.price_idr,quantity:c.quantity,total:v})});let u=0,d=null,m=null;if(t&&t.trim()){const c=t.trim().toUpperCase(),r=this.data.vouchers.find(k=>k.code.toUpperCase()===c&&k.active);if(!r)d="Kode promo tidak valid atau sudah tidak aktif";else if(r.used_count>=r.usage_limit)d="Kuota penggunaan kode promo telah habis";else if(o<r.min_spend)d=`Minimal transaksi untuk kode ini adalah Rp${r.min_spend.toLocaleString("id-ID")}`;else{if(r.kind==="percentage"){const k=Math.floor(o*(r.value/100));u=Math.min(k,r.max_discount||k)}else u=Math.min(r.value,o);m=r}}const h=0,l=Math.max(0,o-u+h);return{subtotal:o,discount:u,fee:h,total:l,itemQuotes:s,appliedVoucher:m,voucherError:d}}createOrder({eventId:a,buyer:n,items:t,voucherCode:e,termsAccepted:i}){if(!i)throw new Error("Anda harus menyetujui ketentuan acara dan kebijakan refund");if(!n.name||!n.email||!n.phone)throw new Error("Data pembeli (nama, email, no HP) wajib diisi lengkap");const o=this.calculateQuote(a,t,e,n.email);if(o.voucherError&&e)throw new Error(o.voucherError);const s=new Date,u="ord-"+Date.now(),d="ORD-"+s.toISOString().slice(0,10).replace(/-/g,"")+"-"+String(this.data.orders.length+1).padStart(6,"0"),m=new Date(s.getTime()+900*1e3).toISOString(),h=t.map(r=>{const k=this.data.ticketTypes.find(v=>v.id===r.ticketTypeId);return{id:"oit-"+Math.random().toString(36).substr(2,9),ticket_type_id:k.id,quantity:r.quantity,unit_price:k.price_idr,ticket_name_snapshot:k.name,attendees:r.attendees}}),l=o.total===0,c={id:u,number:d,event_id:a,buyer_name:n.name,buyer_email:n.email,buyer_phone:n.phone,subtotal:o.subtotal,discount:o.discount,fee:o.fee,total:o.total,status:l?"confirmed":"pending_payment",payment_status:l?"succeeded":"not_started",payment_method:l?"Free Order (Rp0)":null,expires_at:l?null:m,created_at:s.toISOString(),paid_at:l?s.toISOString():null,policy_version:"terms_v1",voucher_code:o.appliedVoucher?o.appliedVoucher.code:null,items:h};return t.forEach(r=>{const k=this.data.ticketTypes.find(v=>v.id===r.ticketTypeId);l?k.allocated+=r.quantity:k.reserved=(k.reserved||0)+r.quantity}),o.appliedVoucher&&o.appliedVoucher.used_count++,this.data.orders.unshift(c),l?(this.issueTicketsForOrder(c),this.logAudit("System Registration","ORDER_CREATED_FREE","order",u,`Free order ${d} confirmed. Issued tickets directly.`)):this.logAudit(n.name,"ORDER_CREATED","order",u,`Order ${d} created. Reserved ${t.reduce((r,k)=>r+k.quantity,0)} tickets.`),this.saveData(),c}issueTicketsForOrder(a){if(!a.items)return[];const n=[];return a.items.forEach(t=>{t.attendees.forEach((e,i)=>{const o="att-"+Date.now()+"-"+Math.floor(Math.random()*1e4),s={id:o,order_id:a.id,slot_index:i,name:e.name||a.buyer_name,email:e.email||a.buyer_email,phone:e.phone||a.buyer_phone};this.data.attendees.push(s),Math.random().toString(36).substring(2,6).toUpperCase();const u=String(this.data.tickets.length+1).padStart(4,"0"),d=`TIX-${new Date().getFullYear()}-${u}`,h=`LK-QR-${Array.from({length:16},()=>Math.floor(Math.random()*16).toString(16).toUpperCase()).join("")}`,l={id:"tix-"+Date.now()+"-"+Math.floor(Math.random()*1e4),order_id:a.id,attendee_id:o,event_id:a.event_id,ticket_type_id:t.ticket_type_id,public_code:d,qr_token_hash:h,status:"valid",issued_at:new Date().toISOString()};this.data.tickets.push(l),n.push(l)})}),n}simulatePaymentSuccess(a,n="QRIS"){const t=this.data.orders.find(e=>e.id===a);if(!t)throw new Error("Order tidak ditemukan");return t.status==="confirmed"?t:t.status==="expired"||t.status==="cancelled"?(t.status="manual_review",t.payment_status="succeeded",t.payment_method=n,t.paid_at=new Date().toISOString(),this.logAudit("Payment Gateway Webhook","LATE_PAYMENT_DETECTED","order",t.id,`Payment for expired order ${t.number} succeeded. Placed into manual_review.`),this.saveData(),t):(t.status="confirmed",t.payment_status="succeeded",t.payment_method=n,t.paid_at=new Date().toISOString(),t.items&&t.items.forEach(e=>{const i=this.data.ticketTypes.find(o=>o.id===e.ticket_type_id);i&&(i.reserved>=e.quantity&&(i.reserved-=e.quantity),i.allocated+=e.quantity)}),this.issueTicketsForOrder(t),this.logAudit("Payment Gateway Adapter","PAYMENT_CONFIRMED","order",t.id,`Payment confirmed via ${n} for ${t.number}. Issued tickets.`),this.saveData(),t)}simulatePaymentFailure(a,n="Customer cancelled / timeout"){const t=this.data.orders.find(e=>e.id===a);if(!t)throw new Error("Order tidak ditemukan");return t.status="cancelled",t.payment_status="failed",this.releaseReservation(a),this.logAudit("Payment Gateway Adapter","PAYMENT_FAILED","order",t.id,`Order ${t.number} marked failed/cancelled. Reason: ${n}`),this.saveData(),t}validateTicketForCheckIn(a,n){if(!n||!n.trim())return{status:"invalid",message:"Input QR atau Kode Tiket kosong"};const t=n.trim(),e=this.data.tickets.find(d=>d.public_code.toUpperCase()===t.toUpperCase()||d.qr_token_hash.toUpperCase()===t.toUpperCase());if(!e)return{status:"not_found",message:"Tiket tidak ditemukan dalam sistem. Pastikan QR atau kode tiket valid."};if(e.event_id!==a){const d=this.data.events.find(m=>m.id===e.event_id);return{status:"wrong_event",ticket:e,message:`Tiket ini terdaftar untuk acara berbeda: "${d?d.title:"Event Lain"}"`}}if(e.status==="suspended")return{status:"suspended",ticket:e,message:"Tiket sedang ditangguhkan (dalam proses investigasi/refund)."};if(e.status==="cancelled"||e.status==="refunded")return{status:"refunded",ticket:e,message:`Tiket sudah dibatalkan / direfund (${e.status.toUpperCase()}). Tidak dapat digunakan.`};const i=this.data.checkIns.find(d=>d.ticket_id===e.id),o=this.data.attendees.find(d=>d.id===e.attendee_id),s=this.data.ticketTypes.find(d=>d.id===e.ticket_type_id),u=this.data.orders.find(d=>d.id===e.order_id);if(i){const d=new Date(i.checked_in_at).toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"});return{status:"already_checked_in",ticket:e,attendee:o,ticketType:s,order:u,checkIn:i,message:`Tiket sudah pernah check-in pada pukul ${d} WIB oleh ${i.staff_name||"Staff"}. Masuk kedua ditolak!`}}return{status:"valid",ticket:e,attendee:o,ticketType:s,order:u,message:"Tiket sah dan belum pernah check-in. Konfirmasi data peserta sebelum admit."}}commitCheckIn({ticketId:a,eventId:n,staffId:t="stf-01",staffName:e="Staff Lokarena",method:i="scan",reason:o=null}){const s=this.data.tickets.find(h=>h.id===a);if(!s)throw new Error("Tiket tidak ditemukan");const u=this.data.checkIns.find(h=>h.ticket_id===a);if(u)throw new Error(`Tiket ini baru saja di-check-in pada ${new Date(u.checked_in_at).toLocaleTimeString("id-ID")}`);if(i==="manual"&&(!o||!o.trim()))throw new Error("Alasan check-in manual wajib diisi");const d={id:"chk-"+Date.now(),ticket_id:a,event_id:n||s.event_id,staff_id:t,staff_name:e,checked_in_at:new Date().toISOString(),method:i,reason:o?o.trim():null};this.data.checkIns.push(d);const m=this.data.attendees.find(h=>h.id===s.attendee_id);return this.logAudit(e,i==="manual"?"CHECK_IN_MANUAL":"CHECK_IN_SCAN","ticket",a,`Check-in attendee ${m?m.name:"Unknown"} (${s.public_code}). Method: ${i}. Reason: ${o||"-"}`),this.saveData(),d}searchAttendeesForStaff(a,n){if(!n||!n.trim())return[];const t=n.trim().toLowerCase();return this.data.tickets.filter(e=>e.event_id===a).map(e=>{const i=this.data.attendees.find(d=>d.id===e.attendee_id),o=this.data.ticketTypes.find(d=>d.id===e.ticket_type_id),s=this.data.checkIns.find(d=>d.ticket_id===e.id),u=this.data.orders.find(d=>d.id===e.order_id);return{ticket:e,attendee:i,ticketType:o,checkIn:s,order:u}}).filter(e=>e.attendee?e.attendee.name.toLowerCase().includes(t)||e.attendee.email.toLowerCase().includes(t)||e.attendee.phone&&e.attendee.phone.includes(t)||e.ticket.public_code.toLowerCase().includes(t)||e.order&&e.order.number.toLowerCase().includes(t):!1)}processFullRefund(a,n="Permintaan pembeli / kebijakan operasional",t="Super Admin"){const e=this.data.orders.find(o=>o.id===a);if(!e)throw new Error("Order tidak ditemukan");if(e.status!=="confirmed"&&e.status!=="manual_review")throw new Error(`Order berstatus ${e.status} tidak dapat direfund`);e.status="refunded",e.payment_status="refunded";const i=this.data.tickets.filter(o=>o.order_id===a);return i.forEach(o=>{o.status="refunded"}),this.logAudit(t,"ORDER_REFUNDED","order",a,`Full refund processed for order ${e.number}. ${i.length} tickets marked as refunded. Reason: ${n}`),this.saveData(),e}resolveManualReview(a,n="fulfill",t="Super Admin"){const e=this.data.orders.find(i=>i.id===a);if(!e||e.status!=="manual_review")throw new Error("Order bukan dalam status manual_review");return n==="fulfill"?(e.status="confirmed",this.issueTicketsForOrder(e),e.items&&e.items.forEach(i=>{const o=this.data.ticketTypes.find(s=>s.id===i.ticket_type_id);o&&(o.allocated+=i.quantity)}),this.logAudit(t,"MANUAL_REVIEW_FULFILL","order",a,`Approved late payment for ${e.number}. Stock allocated and tickets issued.`)):(e.status="refunded",e.payment_status="refunded",this.logAudit(t,"MANUAL_REVIEW_REFUND","order",a,`Rejected late payment for ${e.number}. Refund approved.`)),this.saveData(),e}getTicketsByEmail(a){if(!a||!a.trim())return[];const n=a.trim().toLowerCase();return this.data.tickets.map(t=>{const e=this.data.attendees.find(d=>d.id===t.attendee_id),i=this.data.orders.find(d=>d.id===t.order_id),o=this.data.events.find(d=>d.id===t.event_id),s=this.data.ticketTypes.find(d=>d.id===t.ticket_type_id),u=this.data.checkIns.find(d=>d.ticket_id===t.id);return{ticket:t,attendee:e,order:i,event:o,ticketType:s,checkIn:u}}).filter(t=>{const e=t.attendee&&t.attendee.email.toLowerCase()===n,i=t.order&&t.order.buyer_email.toLowerCase()===n;return e||i})}exportAttendeesCsv(a){const n=s=>{if(s==null)return'""';let u=String(s).replace(/"/g,'""');return/^[=+\-@\t\r]/.test(u)&&(u="'"+u),`"${u}"`},t=this.data.tickets.filter(s=>s.event_id===a),e=this.data.events.find(s=>s.id===a),i=["No","Event","Kode Tiket","Jenis Tiket","Nama Peserta","Email Peserta","No HP Peserta","No Order","Nama Pembeli","Status Tiket","Status Check-In","Waktu Check-In","Metode Check-In","Alasan Manual"],o=t.map((s,u)=>{const d=this.data.attendees.find(c=>c.id===s.attendee_id)||{},m=this.data.orders.find(c=>c.id===s.order_id)||{},h=this.data.ticketTypes.find(c=>c.id===s.ticket_type_id)||{},l=this.data.checkIns.find(c=>c.ticket_id===s.id);return[u+1,e?e.title:"-",s.public_code,h.name||"-",d.name||"-",d.email||"-",d.phone||"-",m.number||"-",m.buyer_name||"-",s.status,l?"SUDAH":"BELUM",l?new Date(l.checked_in_at).toLocaleString("id-ID"):"-",l?l.method:"-",l&&l.reason?l.reason:"-"].map(n).join(",")});return[i.join(","),...o].join(`\r
`)}exportOrdersCsv(a){const n=s=>{if(s==null)return'""';let u=String(s).replace(/"/g,'""');return/^[=+\-@\t\r]/.test(u)&&(u="'"+u),`"${u}"`},t=this.data.orders.filter(s=>s.event_id===a),e=this.data.events.find(s=>s.id===a),i=["No Order","Event","Tanggal Order","Nama Pembeli","Email Pembeli","No HP","Subtotal","Diskon","Biaya Layanan","Total Pembayaran","Status Order","Metode Pembayaran","Waktu Bayar","Kode Voucher"],o=t.map(s=>[s.number,e?e.title:"-",new Date(s.created_at).toLocaleString("id-ID"),s.buyer_name,s.buyer_email,s.buyer_phone,s.subtotal,s.discount,s.fee,s.total,s.status,s.payment_method||"-",s.paid_at?new Date(s.paid_at).toLocaleString("id-ID"):"-",s.voucher_code||"-"].map(n).join(","));return[i.join(","),...o].join(`\r
`)}getDashboardMetrics(a=null){let n=this.data.orders,t=this.data.tickets,e=this.data.checkIns;a&&(n=n.filter(g=>g.event_id===a),t=t.filter(g=>g.event_id===a),e=e.filter(g=>g.event_id===a));const i=n.filter(g=>g.status==="confirmed"),o=n.filter(g=>g.status==="refunded"),s=n.filter(g=>g.status==="manual_review"),u=i.reduce((g,f)=>g+(f.subtotal||0),0),d=i.reduce((g,f)=>g+(f.discount||0),0),m=i.reduce((g,f)=>g+(f.total||0),0),h=o.reduce((g,f)=>g+(f.total||0),0),l=Math.max(0,m-h),c=t.length,r=t.filter(g=>g.status==="valid").length,k=e.length,v=r>0?(k/r*100).toFixed(1):0;return{grossTicketSales:u,totalDiscounts:d,collectedAmount:m,refundAmount:h,netCollected:l,ticketsIssued:c,activeTickets:r,checkedInCount:k,attendanceRate:v,pendingCount:n.filter(g=>g.status==="pending_payment").length,manualReviewCount:s.length}}}const p=new R;class M{static generateMatrix(a,n=25){const t=Array.from({length:n},()=>Array(n).fill(!1)),e=Array.from({length:n},()=>Array(n).fill(!1)),i=(m,h)=>{for(let l=0;l<7;l++)for(let c=0;c<7;c++){const r=c===0||c===6||l===0||l===6,k=c>=2&&c<=4&&l>=2&&l<=4;t[h+l][m+c]=r||k,e[h+l][m+c]=!0}for(let l=-1;l<=7;l++)for(let c=-1;c<=7;c++){const r=h+l,k=m+c;r>=0&&r<n&&k>=0&&k<n&&(e[r][k]=!0)}};i(0,0),i(n-7,0),i(0,n-7);for(let m=8;m<n-8;m++)t[6][m]=m%2===0,t[m][6]=m%2===0,e[6][m]=!0,e[m][6]=!0;if(n>=25){const m=n-7,h=n-7;for(let l=-2;l<=2;l++)for(let c=-2;c<=2;c++){const r=Math.abs(c)===2||Math.abs(l)===2,k=c===0&&l===0;t[h+l][m+c]=r||k,e[h+l][m+c]=!0}}const o=[];for(let m=0;m<a.length;m++)o.push(a.charCodeAt(m));let s=5381;for(let m=0;m<a.length;m++)s=(s<<5)+s+a.charCodeAt(m),s=s&4294967295;const u=()=>(s=s*1664525+1013904223&4294967295,(s>>>0)/4294967296);let d=0;for(let m=n-1;m>=0;m-=2){m===6&&m--;for(let h=0;h<n;h++){const l=Math.floor((n-1-m)/2)%2===0?n-1-h:h;for(let c=0;c<=1;c++){const r=m-c,k=l;if(r>=0&&r<n&&k>=0&&k<n&&!e[k][r]){const v=d<o.length*8?(o[Math.floor(d/8)]>>7-d%8&1)===1:u()>.45,g=(r+k)%2===0;t[k][r]=v^g,d++}}}}return t}static renderToCanvas(a,n,t={}){const e=t.size||25,i=t.scale||7,o=t.margin||2,s=t.darkColor||"#141624",u=t.lightColor||"#ffffff",d=this.generateMatrix(n,e),m=(e+o*2)*i;a.width=m,a.height=m;const h=a.getContext("2d");h.fillStyle=u,h.fillRect(0,0,m,m),h.fillStyle=s;for(let l=0;l<e;l++)for(let c=0;c<e;c++)d[l][c]&&h.fillRect((c+o)*i,(l+o)*i,i,i)}static renderToDom(a,n,t=25){a.innerHTML="",a.style.display="grid",a.style.gridTemplateColumns=`repeat(${t}, 1fr)`;const e=this.generateMatrix(n,t);for(let i=0;i<t;i++)for(let o=0;o<t;o++){const s=document.createElement("span");e[i][o]&&(s.className="tc-dark"),a.appendChild(s)}}}const L={ticket:'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>',"calendar-days":'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>',"map-pin":'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',check:'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',"arrow-right":'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',download:'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',"layout-dashboard":'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',calendar:'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',receipt:'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/></svg>',users:'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',"scan-line":'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/></svg>',"chart-no-axes-combined":'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16v5"/><path d="M16 14v7"/><path d="M20 10v11"/><path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"/><path d="M4 18v3"/><path d="M8 14v7"/></svg>',tag:'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>',clock:'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',search:'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',"shield-alert":'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>',refresh:'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',printer:'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>'};function _(b=document){b.querySelectorAll("i[data-lucide]").forEach(a=>{const n=a.getAttribute("data-lucide");L[n]&&(a.innerHTML=L[n],a.style.display="inline-flex",a.style.alignItems="center",a.style.justifyContent="center")})}class V{constructor(){this.currentView="event",this.selectedEventId="evt-2026-001",this.selectedTicketTypeId="tt-001",this.ticketQty=1,this.appliedVoucherCode="",this.activeOrder=null,this.activeTicket=null,this.adminTab="Dashboard",this.scannerEventId="evt-2026-001",this.scannerVideoTrack=null,this.paymentTimerInterval=null,this.init()}init(){this.bindGlobalEvents(),this.renderCurrentView(),p.subscribe(()=>{this.onStoreUpdate()});const a=window.location.hash.replace("#","");a&&["event","events","checkout","ticket","admin","scanner","my-tickets"].includes(a)&&this.switchView(a)}onStoreUpdate(){this.currentView==="admin"?this.renderAdminView():this.currentView==="event"&&this.renderEventDetail()}playBeep(a=!0){try{const n=new(window.AudioContext||window.webkitAudioContext),t=n.createOscillator(),e=n.createGain();t.connect(e),e.connect(n.destination),a?(t.type="sine",t.frequency.setValueAtTime(880,n.currentTime),t.frequency.exponentialRampToValueAtTime(1320,n.currentTime+.15),e.gain.setValueAtTime(.15,n.currentTime),e.gain.exponentialRampToValueAtTime(.01,n.currentTime+.2),t.start(),t.stop(n.currentTime+.2)):(t.type="sawtooth",t.frequency.setValueAtTime(320,n.currentTime),t.frequency.setValueAtTime(240,n.currentTime+.12),e.gain.setValueAtTime(.2,n.currentTime),e.gain.exponentialRampToValueAtTime(.01,n.currentTime+.3),t.start(),t.stop(n.currentTime+.3))}catch{}}switchView(a,n={}){this.currentView=a,window.location.hash=a,document.querySelectorAll(".tc-tab").forEach(t=>{t.setAttribute("aria-pressed",String(t.dataset.view===a))}),document.querySelectorAll(".tc-link[data-view]").forEach(t=>{t.classList.toggle("tc-current",t.dataset.view===a)}),document.querySelectorAll("[data-screen]").forEach(t=>{t.hidden=t.dataset.screen!==a}),a!=="scanner"&&this.stopScannerCamera(),a==="event"?this.renderEventDetail():a==="events"?this.renderEventsDiscovery():a==="checkout"?this.renderCheckoutView():a==="payment"?this.renderPaymentView():a==="ticket"?this.renderTicketView(n.ticket):a==="my-tickets"?this.renderMyTicketsView():a==="admin"?this.renderAdminView():a==="scanner"&&this.renderScannerView(),_(),window.scrollTo({top:0,behavior:"smooth"})}bindGlobalEvents(){document.querySelectorAll("[data-view]").forEach(t=>{t.addEventListener("click",e=>{const i=t.dataset.view;this.switchView(i)})});const a=document.getElementById("tc-reset-data");a&&a.addEventListener("click",()=>{confirm("Reset seluruh data ke kondisi awal pabrik?")&&(p.resetToDefault(),alert("Data telah direset."),this.switchView("event"))});const n=document.getElementById("tc-help");n&&n.addEventListener("click",()=>{alert(`Pusat Bantuan Lokarena:
- Email: support@lokarena.id
- WhatsApp: +62 812-3456-7890
- Jam Operasional: 08.00–20.00 WIB`)})}renderEventDetail(){const a=p.data.events.find(r=>r.id===this.selectedEventId)||p.data.events[0],n=p.data.ticketTypes.filter(r=>r.event_id===a.id&&r.visible),t=document.getElementById("tc-event-crumb");t&&(t.textContent=`Event / ${a.category}`);const e=document.getElementById("tc-event-title");e&&(e.textContent=a.title);const i=document.getElementById("tc-event-desc");i&&(i.textContent=a.description);const o=document.getElementById("tc-event-date");o&&(o.textContent=a.date_display);const s=document.getElementById("tc-event-time");s&&(s.textContent=a.time_display);const u=document.getElementById("tc-event-venue");u&&(u.textContent=a.venue);const d=document.getElementById("tc-event-city");d&&(d.textContent=a.city);const m=document.getElementById("tc-speakers-list");m&&(m.innerHTML=(a.speakers||[]).map(r=>`
        <div class="tc-speaker">
          <div class="tc-portrait ${r.portraitIndex===1?"tc-middle":r.portraitIndex===2?"tc-last":""}" role="img" aria-label="${r.name}"></div>
          <strong>${r.name}</strong>
          <div class="tc-muted">${r.role}</div>
        </div>
      `).join(""));const h=document.getElementById("tc-agenda-list");h&&(h.innerHTML=(a.agenda||[]).map(r=>`
        <div class="tc-agenda">
          <span class="tc-muted">${r.time}</span>
          <div>
            <strong>${r.title}</strong>
            <div class="tc-muted tc-small">${r.note}</div>
          </div>
        </div>
      `).join(""));const l=document.getElementById("tc-ticket-selector");l&&(l.innerHTML=n.map(r=>{const k=r.quota-r.allocated-(r.reserved||0),v=k<=0,g=r.id===this.selectedTicketTypeId;return`
          <div class="tc-ticket-option ${g?"tc-selected":""}" data-tt-id="${r.id}" style="border: 2px solid ${g?"var(--tc-brand)":"var(--tc-line)"}; border-radius: var(--radius-md); padding: 14px; margin-bottom: 12px; cursor: ${v?"not-allowed":"pointer"}; opacity: ${v?.6:1}">
            <div class="tc-row" style="margin-bottom: 4px">
              <div>
                <strong>${r.name}</strong>
                <div class="tc-muted tc-small">${r.description||""}</div>
              </div>
              <span class="tc-pill ${v?"tc-danger":"tc-ok"}">${v?"Sold Out":`Sisa ${k}`}</span>
            </div>
            <div class="tc-price" style="font-size: 20px">${r.price_idr===0?"GRATIS":"Rp"+r.price_idr.toLocaleString("id-ID")}</div>
            <ul class="tc-list" style="margin: 8px 0 0">
              ${(r.benefits||[]).map(f=>`<li><i data-lucide="check"></i>${f}</li>`).join("")}
            </ul>
          </div>
        `}).join(""),l.querySelectorAll(".tc-ticket-option").forEach(r=>{r.addEventListener("click",()=>{const k=r.dataset.ttId,v=n.find(f=>f.id===k);v.quota-v.allocated-(v.reserved||0)>0&&(this.selectedTicketTypeId=k,this.ticketQty=1,this.renderEventDetail())})}));const c=n.find(r=>r.id===this.selectedTicketTypeId)||n[0];if(c){const r=c.quota-c.allocated-(c.reserved||0),k=Math.min(c.max_per_order||4,r),v=document.getElementById("tc-qty");v&&(v.textContent=this.ticketQty);const g=document.getElementById("tc-minus");g&&(g.disabled=this.ticketQty<=1,g.onclick=()=>{this.ticketQty>1&&(this.ticketQty--,this.renderEventDetail())});const f=document.getElementById("tc-plus");f&&(f.disabled=this.ticketQty>=k,f.onclick=()=>{this.ticketQty<k&&(this.ticketQty++,this.renderEventDetail())});const y=document.getElementById("tc-event-total");if(y){const E=c.price_idr*this.ticketQty;y.textContent=E===0?"GRATIS":"Rp"+E.toLocaleString("id-ID")}const w=document.getElementById("tc-btn-to-checkout");w&&(w.disabled=r<=0,w.onclick=()=>{this.switchView("checkout")})}}renderEventsDiscovery(){const a=document.getElementById("tc-discovery-list");if(!a)return;const n=p.data.events.filter(t=>t.publication_status==="published");a.innerHTML=n.map(t=>`
      <div class="tc-panel" style="display: flex; gap: 20px; align-items: center; margin-bottom: 16px; cursor: pointer;" data-event-id="${t.id}">
        <div class="tc-event-thumb" style="width: 100px; height: 90px; border-radius: 10px;"></div>
        <div style="flex: 1">
          <div class="tc-row" style="margin-bottom: 4px">
            <span class="tc-pill">${t.category}</span>
            <span class="tc-muted tc-small">${t.city}</span>
          </div>
          <h3 style="margin: 4px 0">${t.title}</h3>
          <p class="tc-muted tc-small" style="margin: 0">${t.date_display} · ${t.time_display}</p>
        </div>
        <button class="tc-secondary">Buka Detail <i data-lucide="arrow-right"></i></button>
      </div>
    `).join(""),a.querySelectorAll("[data-event-id]").forEach(t=>{t.addEventListener("click",()=>{var e;this.selectedEventId=t.dataset.eventId,this.selectedTicketTypeId=(e=p.data.ticketTypes.find(i=>i.event_id===this.selectedEventId))==null?void 0:e.id,this.ticketQty=1,this.switchView("event")})})}renderCheckoutView(){const a=p.data.events.find(c=>c.id===this.selectedEventId),n=p.data.ticketTypes.find(c=>c.id===this.selectedTicketTypeId);if(!a||!n){this.switchView("event");return}const t=document.getElementById("tc-checkout-event-title");t&&(t.textContent=a.title);const e=document.getElementById("tc-checkout-event-meta");e&&(e.textContent=`${a.date_display} · ${a.city}`);const i=document.getElementById("tc-attendee-fields");if(i){i.innerHTML="";for(let c=0;c<this.ticketQty;c++){const r=document.createElement("div");r.className="tc-panel",r.style.padding="14px",r.style.marginBottom="12px",r.style.background="var(--tc-bg)",r.innerHTML=`
          <strong>Peserta ${c+1} (${n.name})</strong>
          <div class="tc-formgrid" style="margin-top: 8px">
            <div>
              <label for="tc-att-name-${c}">Nama Lengkap</label>
              <input id="tc-att-name-${c}" required placeholder="Sesuai kartu identitas">
            </div>
            <div>
              <label for="tc-att-email-${c}">Email Peserta</label>
              <input id="tc-att-email-${c}" type="email" required placeholder="Tujuan pengiriman tiket">
            </div>
          </div>
        `,i.appendChild(r)}}const o=document.getElementById("tc-same-as-buyer"),s=document.getElementById("tc-buyer-name"),u=document.getElementById("tc-buyer-email"),d=()=>{if(o&&o.checked){const c=document.getElementById("tc-att-name-0"),r=document.getElementById("tc-att-email-0");c&&s&&(c.value=s.value,c.readOnly=!0),r&&u&&(r.value=u.value,r.readOnly=!0)}else{const c=document.getElementById("tc-att-name-0"),r=document.getElementById("tc-att-email-0");c&&(c.readOnly=!1),r&&(r.readOnly=!1)}};s&&(s.oninput=d),u&&(u.oninput=d),o&&(o.onchange=d),d(),this.updateCheckoutTotals();const m=document.getElementById("tc-btn-apply-voucher"),h=document.getElementById("tc-voucher-code");document.getElementById("tc-voucher-msg"),m&&h&&(m.onclick=()=>{const c=h.value.trim().toUpperCase();this.appliedVoucherCode=c,this.updateCheckoutTotals()});const l=document.getElementById("tc-checkout-form");l&&(l.onsubmit=c=>{var k,v;c.preventDefault();const r=[];for(let g=0;g<this.ticketQty;g++){const f=document.getElementById(`tc-att-name-${g}`),y=document.getElementById(`tc-att-email-${g}`);r.push({name:f?f.value.trim():"",email:y?y.value.trim():""})}try{const g=p.createOrder({eventId:a.id,buyer:{name:s.value.trim(),email:u.value.trim(),phone:(((k=document.getElementById("tc-buyer-phone"))==null?void 0:k.value)||"081234567890").trim()},items:[{ticketTypeId:n.id,quantity:this.ticketQty,attendees:r}],voucherCode:this.appliedVoucherCode,termsAccepted:(v=document.getElementById("tc-terms-check"))==null?void 0:v.checked});if(this.activeOrder=g,g.status==="confirmed"){const f=p.data.tickets.find(y=>y.order_id===g.id);alert("Pendaftaran berhasil! Tiket gratis Anda telah terkonfirmasi."),this.switchView("ticket",{ticket:f})}else this.switchView("payment")}catch(g){alert("Gagal membuat pesanan: "+g.message)}})}updateCheckoutTotals(){var n;const a=p.data.ticketTypes.find(t=>t.id===this.selectedTicketTypeId);if(a)try{const t=p.calculateQuote(this.selectedEventId,[{ticketTypeId:a.id,quantity:this.ticketQty}],this.appliedVoucherCode,((n=document.getElementById("tc-buyer-email"))==null?void 0:n.value)||"");document.getElementById("tc-checkout-item-title").textContent=`${a.name} × ${this.ticketQty}`,document.getElementById("tc-checkout-subtotal").textContent="Rp"+t.subtotal.toLocaleString("id-ID"),document.getElementById("tc-checkout-discount").textContent=t.discount>0?`−Rp${t.discount.toLocaleString("id-ID")}`:"Rp0",document.getElementById("tc-checkout-total").textContent=t.total===0?"GRATIS (Rp0)":"Rp"+t.total.toLocaleString("id-ID");const e=document.getElementById("tc-voucher-msg");e&&(t.appliedVoucher?(e.textContent=`Promo berhasil digunakan (${t.appliedVoucher.code})! Hemat Rp${t.discount.toLocaleString("id-ID")}`,e.style.color="var(--tc-green)"):this.appliedVoucherCode?(e.textContent=t.voucherError||"Kode promo tidak berlaku.",e.style.color="var(--tc-red)"):e.textContent="")}catch(t){console.warn("Quote error:",t)}}renderPaymentView(){if(this.activeOrder||(this.activeOrder=p.data.orders.find(d=>d.status==="pending_payment")),!this.activeOrder){alert("Tidak ada pembayaran aktif."),this.switchView("event");return}const a=this.activeOrder;document.getElementById("tc-pay-ord-number").textContent=a.number,document.getElementById("tc-pay-amount").textContent="Rp"+a.total.toLocaleString("id-ID"),this.paymentTimerInterval&&clearInterval(this.paymentTimerInterval);const n=()=>{const d=Date.now(),m=new Date(a.expires_at).getTime(),h=Math.max(0,Math.floor((m-d)/1e3)),l=Math.floor(h/60),c=h%60,r=document.getElementById("tc-pay-countdown");r&&(r.textContent=`${String(l).padStart(2,"0")}:${String(c).padStart(2,"0")}`),h<=0&&(clearInterval(this.paymentTimerInterval),document.getElementById("tc-pay-status-note").textContent="Waktu pembayaran telah habis. Pesanan dibatalkan.",document.getElementById("tc-pay-status-note").className="tc-toast tc-error")};n(),this.paymentTimerInterval=setInterval(n,1e3);const t=document.getElementById("tc-payment-method-select"),e=document.getElementById("tc-payment-method-details"),i=()=>{const d=t?t.value:"qris";if(d==="qris"){e.innerHTML=`
          <div style="text-align: center; padding: 16px; background: #fff; border-radius: var(--radius-md); margin-top: 10px; color: #000">
            <strong>QRIS Lokarena Transaksi</strong>
            <div id="tc-qris-canvas-holder" style="margin: 12px auto; width: 160px; height: 160px;"></div>
            <div class="tc-small tc-muted">Scan menggunakan GoPay, OVO, Dana, BCA, atau aplikasi perbankan</div>
          </div>
        `;const m=document.getElementById("tc-qris-canvas-holder");if(m){const h=document.createElement("canvas");M.renderToCanvas(h,`00020101021226590014ID.LINKAJA.WWW01189360091100000000005204581253033605405${a.total}5802ID5910LOKARENA6007JAKARTA62170113${a.number}`),h.style.width="160px",h.style.height="160px",m.appendChild(h)}}else d==="va_bca"?e.innerHTML=`
          <div class="tc-panel" style="background: var(--tc-bg); padding: 14px; margin-top: 10px">
            <span class="tc-muted tc-small">Nomor Virtual Account BCA</span>
            <div class="tc-row" style="margin: 4px 0">
              <strong style="font-size: 18px; letter-spacing: 1px">88001 0812 3456 7890</strong>
              <button class="tc-secondary" style="min-height: 32px; padding: 4px 10px; font-size: 11px" onclick="alert('Nomor VA disalin!')">Salin</button>
            </div>
            <div class="tc-small tc-muted">Menerima transfer dari seluruh bank (Jaringan Prima / ATM Bersama)</div>
          </div>
        `:d==="va_mandiri"?e.innerHTML=`
          <div class="tc-panel" style="background: var(--tc-bg); padding: 14px; margin-top: 10px">
            <span class="tc-muted tc-small">Kode Perusahaan & Nomor Mandiri VA</span>
            <div class="tc-row" style="margin: 4px 0">
              <strong style="font-size: 18px; letter-spacing: 1px">70012 9981 2345 6789</strong>
              <button class="tc-secondary" style="min-height: 32px; padding: 4px 10px; font-size: 11px" onclick="alert('Nomor VA disalin!')">Salin</button>
            </div>
          </div>
        `:e.innerHTML=`
          <div class="tc-panel" style="background: var(--tc-bg); padding: 14px; margin-top: 10px">
            <span class="tc-muted tc-small">E-Wallet (GoPay / OVO / Dana / ShopeePay)</span>
            <p style="margin: 6px 0 0">Notifikasi push akan dikirim ke nomor HP pembeli <strong>${a.buyer_phone}</strong></p>
          </div>
        `};t&&(t.onchange=i,i());const o=document.getElementById("tc-btn-sim-pay-success");o&&(o.onclick=()=>{const d=t?t.options[t.selectedIndex].text:"QRIS";p.simulatePaymentSuccess(a.id,d),this.playBeep(!0);const m=p.data.tickets.find(h=>h.order_id===a.id);alert("Pembayaran berhasil diverifikasi oleh server! E-Ticket telah diterbitkan."),this.switchView("ticket",{ticket:m})});const s=document.getElementById("tc-btn-sim-pay-failed");s&&(s.onclick=()=>{p.simulatePaymentFailure(a.id,"Simulasi pembatalan oleh pembeli"),this.playBeep(!1),alert("Status pesanan diubah menjadi BATAL / EXPIRED. Reservasi tiket dilepaskan."),this.switchView("event")});const u=document.getElementById("tc-btn-sim-pay-late");u&&(u.onclick=()=>{a.status="expired",p.simulatePaymentSuccess(a.id,"Late Payment Webhook"),this.playBeep(!1),alert(`Skenario Edge Case: Pembayaran diterima setelah batas waktu (Order ${a.number}). Sistem menahan status di 'MANUAL_REVIEW' untuk audit admin.`),this.switchView("admin")})}renderTicketView(a){let n=a;if(n||(n=p.data.tickets[p.data.tickets.length-1]),!n){alert("Belum ada e-ticket yang terbit."),this.switchView("event");return}this.activeTicket=n;const t=p.data.events.find(l=>l.id===n.event_id)||p.data.events[0],e=p.data.attendees.find(l=>l.id===n.attendee_id)||{},i=p.data.ticketTypes.find(l=>l.id===n.ticket_type_id)||{},o=p.data.orders.find(l=>l.id===n.order_id)||{},s=p.data.checkIns.find(l=>l.ticket_id===n.id);document.getElementById("tc-ticket-event-title").textContent=t.title,document.getElementById("tc-ticket-event-date").textContent=`${t.date_display} · ${t.time_display}`,document.getElementById("tc-ticket-type-name").textContent=i.name||"Pass",document.getElementById("tc-ticket-attendee-name").textContent=e.name||"Nama Peserta",document.getElementById("tc-ticket-code-label").textContent=`${n.public_code} · Order #${o.number||""}`,document.getElementById("tc-ticket-venue").textContent=t.venue,document.getElementById("tc-ticket-time").textContent=t.time_display;const u=document.getElementById("tc-ticket-webinar-link");u&&(t.online_access_ref&&n.status==="valid"?(u.hidden=!1,u.innerHTML=`<strong>Tautan Webinar:</strong> <a href="${t.online_access_ref}" target="_blank" style="color: var(--tc-brand)">${t.online_access_ref}</a>`):u.hidden=!0);const d=document.getElementById("tc-ticket-status-pill");d&&(n.status==="refunded"?(d.textContent="Refunded",d.className="tc-pill tc-danger"):s?(d.textContent="Sudah Check-In",d.className="tc-pill tc-ok"):(d.textContent="Terkonfirmasi (Valid)",d.className="tc-pill tc-ok"));const m=document.getElementById("tc-ticket-qr");if(m){m.innerHTML="";const l=document.createElement("canvas");M.renderToCanvas(l,n.qr_token_hash,{size:25,scale:6}),l.style.width="160px",l.style.height="160px",l.style.display="block",l.style.margin="0 auto",m.appendChild(l)}const h=document.getElementById("tc-download-ticket-btn");h&&(h.onclick=()=>{window.print()})}renderMyTicketsView(){const a=document.getElementById("tc-mytickets-list"),n=document.getElementById("tc-magiclink-form"),t=document.getElementById("tc-magiclink-email"),e=document.getElementById("tc-mytickets-result");n&&(n.onsubmit=i=>{i.preventDefault();const o=t.value.trim(),s=p.getTicketsByEmail(o);e.hidden=!1,s.length===0?a.innerHTML=`
            <div class="tc-panel" style="text-align: center; padding: 24px;">
              <p class="tc-muted">Tidak ditemukan tiket yang terhubung dengan email <strong>${o}</strong>.</p>
              <button class="tc-secondary" onclick="document.getElementById('tc-magiclink-email').focus()">Coba Email Lain</button>
            </div>
          `:(a.innerHTML=s.map(u=>`
            <div class="tc-panel" style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center">
              <div>
                <span class="tc-pill ${u.checkIn?"tc-ok":""}">${u.checkIn?"Sudah Check-In":"Aktif"}</span>
                <h3 style="margin: 6px 0 2px">${u.event.title}</h3>
                <div class="tc-muted tc-small">${u.ticketType.name} · Peserta: <strong>${u.attendee.name}</strong></div>
                <div class="tc-muted tc-small">Kode: ${u.ticket.public_code} · Order #${u.order.number}</div>
              </div>
              <button class="tc-primary tc-view-single-tix" data-tix-id="${u.ticket.id}">
                Buka E-Ticket <i data-lucide="arrow-right"></i>
              </button>
            </div>
          `).join(""),a.querySelectorAll(".tc-view-single-tix").forEach(u=>{u.onclick=()=>{const d=p.data.tickets.find(m=>m.id===u.dataset.tixId);this.switchView("ticket",{ticket:d})}}),_(a))})}renderScannerView(){const a=document.getElementById("tc-scanner-event-select");a&&(a.innerHTML=p.data.events.map(d=>`
        <option value="${d.id}" ${d.id===this.scannerEventId?"selected":""}>${d.title}</option>
      `).join(""),a.onchange=()=>{this.scannerEventId=a.value,this.renderScannerView()});const n=document.getElementById("tc-toggle-camera-btn");n&&(n.onclick=()=>{this.scannerVideoTrack?(this.stopScannerCamera(),n.textContent="Nyalakan Kamera"):(this.startScannerCamera(),n.textContent="Matikan Kamera")});const t=document.getElementById("tc-btn-sim-scan");t&&(t.onclick=()=>{const d=p.data.tickets.filter(l=>l.event_id===this.scannerEventId);if(d.length===0){alert("Belum ada tiket terdaftar untuk event ini. Buat order terlebih dahulu!");return}const h=d.find(l=>!p.data.checkIns.some(c=>c.ticket_id===l.id))||d[0];this.processScanValidation(h.qr_token_hash)});const e=document.getElementById("tc-manual-search-toggle"),i=document.getElementById("tc-scanner-manual-box");e&&i&&(e.onclick=()=>{i.hidden=!i.hidden});const o=document.getElementById("tc-scanner-manual-input"),s=document.getElementById("tc-scanner-manual-find-btn"),u=document.getElementById("tc-scanner-manual-results");s&&o&&(s.onclick=()=>{const d=o.value.trim(),m=p.searchAttendeesForStaff(this.scannerEventId,d);m.length===0?u.innerHTML=`<p class="tc-error" style="margin-top: 8px">Tidak ditemukan peserta dengan kata kunci "${d}"</p>`:(u.innerHTML=m.map(h=>`
            <div class="tc-panel" style="padding: 10px; margin-top: 8px; display: flex; justify-content: space-between; align-items: center">
              <div>
                <strong>${h.attendee.name}</strong> (${h.ticketType.name})
                <div class="tc-muted tc-small">Kode: ${h.ticket.public_code} · ${h.attendee.email}</div>
              </div>
              <button class="tc-secondary tc-pick-manual-tix" data-tix-code="${h.ticket.public_code}" style="min-height: 32px; padding: 4px 10px">Pilih</button>
            </div>
          `).join(""),u.querySelectorAll(".tc-pick-manual-tix").forEach(h=>{h.onclick=()=>{this.processScanValidation(h.dataset.tixCode,"manual")}}))})}async startScannerCamera(){const a=document.getElementById("tc-scanner-video");if(a)try{const n=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}});a.srcObject=n,a.play(),this.scannerVideoTrack=n.getVideoTracks()[0]}catch(n){console.warn("Camera access denied or unavailable:",n),alert('Kamera tidak dapat diakses atau izin ditolak. Anda dapat menggunakan fitur "Simulasikan Scan" atau "Cari Manual".')}}stopScannerCamera(){this.scannerVideoTrack&&(this.scannerVideoTrack.stop(),this.scannerVideoTrack=null);const a=document.getElementById("tc-scanner-video");a&&(a.srcObject=null)}processScanValidation(a,n="scan"){const t=p.validateTicketForCheckIn(this.scannerEventId,a),e=document.getElementById("tc-scan-result-box");e&&(e.hidden=!1,t.status==="valid"?(this.playBeep(!0),e.className="tc-result",e.innerHTML=`
        <h3><i data-lucide="check"></i> Tiket Sah (Belum Check-In)</h3>
        <strong>${t.attendee.name}</strong>
        <div class="tc-muted tc-small">${t.ticketType.name} · ${t.ticket.public_code}</div>
        <p class="tc-small" style="margin: 8px 0 12px">${t.message}</p>
        ${n==="manual"?`
          <div style="margin-bottom: 12px">
            <label for="tc-manual-reason-input">Alasan Check-In Manual (Wajib)</label>
            <input id="tc-manual-reason-input" placeholder="Contoh: KTP cocok, HP peserta lowbat" required>
          </div>
        `:""}
        <button class="tc-primary tc-full" id="tc-btn-confirm-admit">Konfirmasi Check-In Sekarang</button>
      `,document.getElementById("tc-btn-confirm-admit").onclick=()=>{let i=null;if(n==="manual"){const o=document.getElementById("tc-manual-reason-input");if(!o||!o.value.trim()){alert("Alasan check-in manual wajib diisi!");return}i=o.value.trim()}try{p.commitCheckIn({ticketId:t.ticket.id,eventId:this.scannerEventId,staffId:"stf-01",staffName:"Staff Lokarena",method:n,reason:i}),this.playBeep(!0),e.className="tc-result",e.innerHTML=`
            <h3><i data-lucide="check"></i> Check-In Berhasil</h3>
            <p><strong>${t.attendee.name}</strong> telah masuk ke venue acara.</p>
            <div class="tc-small tc-muted">Waktu: ${new Date().toLocaleTimeString("id-ID")} · Metode: ${n.toUpperCase()}</div>
          `,_(e)}catch(o){alert("Gagal check-in: "+o.message)}}):t.status==="already_checked_in"?(this.playBeep(!1),e.className="tc-result tc-duplicate",e.innerHTML=`
        <h3><i data-lucide="shield-alert"></i> Peringatan: Tiket Sudah Check-In!</h3>
        <strong>${t.attendee?t.attendee.name:"Peserta"}</strong> (${t.ticket.public_code})
        <p class="tc-small" style="margin: 8px 0">${t.message}</p>
      `):(this.playBeep(!1),e.className="tc-result tc-invalid",e.innerHTML=`
        <h3><i data-lucide="shield-alert"></i> Tiket Ditolak</h3>
        <p class="tc-small" style="margin: 8px 0">${t.message}</p>
      `),_(e))}renderAdminView(){document.querySelectorAll("[data-admin-tab]").forEach(t=>{t.classList.toggle("tc-active",t.dataset.adminTab===this.adminTab),t.onclick=()=>{this.adminTab=t.dataset.adminTab,this.renderAdminView()}});const a=document.getElementById("tc-admin-view-title");a&&(a.textContent=this.adminTab);const n=document.getElementById("tc-admin-content-holder");if(n){if(this.adminTab==="Dashboard"){const t=p.getDashboardMetrics();n.innerHTML=`
        <div class="tc-stats">
          <div class="tc-stat">
            <span class="tc-muted tc-small">Total Dana Terkumpul (Net)</span>
            <strong>Rp${t.netCollected.toLocaleString("id-ID")}</strong>
            <span class="tc-muted tc-small">Gross: Rp${t.grossTicketSales.toLocaleString("id-ID")}</span>
          </div>
          <div class="tc-stat">
            <span class="tc-muted tc-small">Tiket Diterbitkan</span>
            <strong>${t.ticketsIssued} <span class="tc-muted tc-small">tiket</span></strong>
            <span class="tc-muted tc-small">Aktif: ${t.activeTickets}</span>
          </div>
          <div class="tc-stat">
            <span class="tc-muted tc-small">Kehadiran (Attendance Rate)</span>
            <strong>${t.attendanceRate}%</strong>
            <span class="tc-muted tc-small">${t.checkedInCount} dari ${t.activeTickets} hadir</span>
          </div>
        </div>

        ${t.manualReviewCount>0?`
          <div class="tc-toast" style="background: var(--tc-ambersoft); color: var(--tc-amber); border: 1px solid var(--tc-amber); margin-bottom: 16px;">
            <i data-lucide="shield-alert"></i>
            <div>
              <strong>Perhatian:</strong> Ada ${t.manualReviewCount} order late payment dalam status <em>Manual Review</em> yang membutuhkan keputusan admin!
              <button class="tc-secondary" style="margin-left: 12px; min-height: 28px; padding: 2px 8px; font-size: 11px" onclick="window.lokarenaApp.adminTab='Orders'; window.lokarenaApp.renderAdminView();">Buka Orders</button>
            </div>
          </div>
        `:""}

        <div class="tc-panel" style="margin-top: 18px">
          <div class="tc-row">
            <h3 style="margin: 0">Order Terbaru</h3>
            <button class="tc-secondary" id="tc-btn-export-orders-csv"><i data-lucide="download"></i> Export Orders CSV</button>
          </div>
          <div class="tc-tablewrap">
            <table>
              <thead>
                <tr>
                  <th>No Order</th>
                  <th>Pembeli</th>
                  <th>Subtotal</th>
                  <th>Diskon</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${p.data.orders.slice(0,5).map(i=>`
                  <tr>
                    <td><strong>${i.number}</strong><div class="tc-muted tc-small">${new Date(i.created_at).toLocaleDateString("id-ID")}</div></td>
                    <td><strong>${i.buyer_name}</strong><div class="tc-muted tc-small">${i.buyer_email}</div></td>
                    <td>Rp${i.subtotal.toLocaleString("id-ID")}</td>
                    <td>Rp${i.discount.toLocaleString("id-ID")}</td>
                    <td><strong>Rp${i.total.toLocaleString("id-ID")}</strong></td>
                    <td>
                      <span class="tc-pill ${i.status==="confirmed"?"tc-ok":i.status==="manual_review"?"tc-warning":i.status==="refunded"?"tc-danger":""}">${i.status.toUpperCase()}</span>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;const e=document.getElementById("tc-btn-export-orders-csv");e&&(e.onclick=()=>{this.downloadCsv(p.exportOrdersCsv(this.selectedEventId),`Lokarena-Orders-${Date.now()}.csv`)})}else if(this.adminTab==="Events"){n.innerHTML=`
        <div class="tc-row" style="margin-bottom: 16px">
          <p class="tc-muted">Kelola seluruh event dan status publikasi.</p>
          <button class="tc-primary" id="tc-btn-create-event-modal"><i data-lucide="plus"></i> Tambah Event Baru</button>
        </div>
        <div class="tc-tablewrap">
          <table>
            <thead>
              <tr>
                <th>Judul Event</th>
                <th>Kategori / Tipe</th>
                <th>Jadwal</th>
                <th>Kapasitas</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${p.data.events.map(e=>`
                <tr>
                  <td><strong>${e.title}</strong><div class="tc-muted tc-small">${e.venue} (${e.city})</div></td>
                  <td>${e.category} · <span class="tc-pill">${e.type}</span></td>
                  <td>${e.date_display}<div class="tc-muted tc-small">${e.time_display}</div></td>
                  <td>${e.capacity} peserta</td>
                  <td><span class="tc-pill ${e.publication_status==="published"?"tc-ok":"tc-warning"}">${e.publication_status}</span></td>
                  <td>
                    <button class="tc-secondary tc-toggle-event-pub" data-ev-id="${e.id}" style="min-height: 32px; padding: 4px 10px; font-size: 11px">
                      ${e.publication_status==="published"?"Tarik Draft":"Publikasikan"}
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `,n.querySelectorAll(".tc-toggle-event-pub").forEach(e=>{e.onclick=()=>{const i=p.data.events.find(o=>o.id===e.dataset.evId);i&&(i.publication_status=i.publication_status==="published"?"draft":"published",p.saveData(),p.logAudit("Super Admin","EVENT_STATUS_CHANGE","event",i.id,`Status event ${i.title} diubah menjadi ${i.publication_status}`),this.renderAdminView())}});const t=document.getElementById("tc-btn-create-event-modal");t&&(t.onclick=()=>{const e=prompt("Judul Event Baru:");if(e&&e.trim()){const i={id:"evt-"+Date.now(),slug:e.toLowerCase().replace(/[^a-z0-9]+/g,"-"),title:e.trim(),category:"Seminar",type:"offline",timezone:"WIB",start_at:new Date(Date.now()+12096e5).toISOString(),end_at:new Date(Date.now()+12096e5+288e5).toISOString(),date_display:"18 November 2026",time_display:"09.00–17.00 WIB",publication_status:"published",capacity:250,venue:"Lokarena Conference Center",city:"Jakarta",organizer_name:"Lokarena Organizer",description:"Event baru diselenggarakan oleh Lokarena."};p.data.events.push(i),p.data.ticketTypes.push({id:"tt-"+Date.now(),event_id:i.id,name:"Regular Pass",price_idr:2e5,quota:250,allocated:0,reserved:0,min_per_order:1,max_per_order:4,visible:!0,benefits:["Akses seminar penuh","Digital kit"]}),p.saveData(),alert("Event baru berhasil dibuat dan dipublikasikan!"),this.renderAdminView()}})}else if(this.adminTab==="Orders")n.innerHTML=`
        <div class="tc-tablewrap">
          <table>
            <thead>
              <tr>
                <th>No Order</th>
                <th>Pembeli</th>
                <th>Total</th>
                <th>Status</th>
                <th>Aksi Operasional</th>
              </tr>
            </thead>
            <tbody>
              ${p.data.orders.map(t=>`
                <tr>
                  <td>
                    <strong>${t.number}</strong>
                    <div class="tc-muted tc-small">${new Date(t.created_at).toLocaleString("id-ID")}</div>
                  </td>
                  <td>
                    <strong>${t.buyer_name}</strong>
                    <div class="tc-muted tc-small">${t.buyer_email} · ${t.buyer_phone}</div>
                  </td>
                  <td><strong>Rp${t.total.toLocaleString("id-ID")}</strong></td>
                  <td>
                    <span class="tc-pill ${t.status==="confirmed"?"tc-ok":t.status==="manual_review"?"tc-warning":t.status==="refunded"?"tc-danger":""}">
                      ${t.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    ${t.status==="manual_review"?`
                      <button class="tc-primary tc-resolve-review-approve" data-ord-id="${t.id}" style="min-height: 28px; padding: 2px 8px; font-size: 11px">Setujui & Fulfill</button>
                      <button class="tc-secondary tc-resolve-review-refund" data-ord-id="${t.id}" style="min-height: 28px; padding: 2px 8px; font-size: 11px">Refund</button>
                    `:t.status==="confirmed"?`
                      <button class="tc-secondary tc-refund-order-btn" data-ord-id="${t.id}" style="min-height: 28px; padding: 2px 8px; font-size: 11px">Proses Refund</button>
                      <button class="tc-secondary tc-resend-order-btn" data-ord-id="${t.id}" style="min-height: 28px; padding: 2px 8px; font-size: 11px">Kirim Ulang Email</button>
                    `:"-"}
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `,n.querySelectorAll(".tc-resolve-review-approve").forEach(t=>{t.onclick=()=>{p.resolveManualReview(t.dataset.ordId,"fulfill","Super Admin"),alert("Late payment disetujui! Stok dialokasikan dan e-ticket diterbitkan."),this.renderAdminView()}}),n.querySelectorAll(".tc-resolve-review-refund").forEach(t=>{t.onclick=()=>{p.resolveManualReview(t.dataset.ordId,"refund","Super Admin"),alert("Late payment ditolak dan diproses refund."),this.renderAdminView()}}),n.querySelectorAll(".tc-refund-order-btn").forEach(t=>{t.onclick=()=>{const e=prompt("Masukkan alasan full refund:");e&&e.trim()&&(p.processFullRefund(t.dataset.ordId,e.trim(),"Super Admin"),alert("Full refund berhasil diproses. Tiket dinonaktifkan."),this.renderAdminView())}}),n.querySelectorAll(".tc-resend-order-btn").forEach(t=>{t.onclick=()=>{alert("Notifikasi konfirmasi dan link tiket telah dikirim ulang ke email pembeli.")}});else if(this.adminTab==="Participants"){n.innerHTML=`
        <div class="tc-row" style="margin-bottom: 16px">
          <p class="tc-muted">Database peserta terdaftar dan status kehadiran.</p>
          <button class="tc-secondary" id="tc-btn-export-attendees-csv"><i data-lucide="download"></i> Export Attendees CSV</button>
        </div>
        <div class="tc-tablewrap">
          <table>
            <thead>
              <tr>
                <th>Nama Peserta</th>
                <th>Kontak</th>
                <th>Kode Tiket</th>
                <th>Check-In</th>
                <th>Waktu Masuk</th>
              </tr>
            </thead>
            <tbody>
              ${p.data.tickets.map(e=>{const i=p.data.attendees.find(u=>u.id===e.attendee_id)||{},o=p.data.ticketTypes.find(u=>u.id===e.ticket_type_id)||{},s=p.data.checkIns.find(u=>u.ticket_id===e.id);return`
                  <tr>
                    <td><strong>${i.name||"-"}</strong><div class="tc-muted tc-small">${o.name||"-"}</div></td>
                    <td>${i.email||"-"}<div class="tc-muted tc-small">${i.phone||"-"}</div></td>
                    <td><code>${e.public_code}</code></td>
                    <td>
                      <span class="tc-pill ${s?"tc-ok":""}">${s?"SUDAH":"BELUM"}</span>
                    </td>
                    <td>${s?new Date(s.checked_in_at).toLocaleTimeString("id-ID"):"-"}</td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      `;const t=document.getElementById("tc-btn-export-attendees-csv");t&&(t.onclick=()=>{this.downloadCsv(p.exportAttendeesCsv(this.selectedEventId),`Lokarena-Attendees-${Date.now()}.csv`)})}else if(this.adminTab==="Vouchers"){n.innerHTML=`
        <div class="tc-row" style="margin-bottom: 16px">
          <p class="tc-muted">Voucher dan promo penjualan tiket.</p>
          <button class="tc-primary" id="tc-btn-add-voucher"><i data-lucide="plus"></i> Buat Voucher</button>
        </div>
        <div class="tc-tablewrap">
          <table>
            <thead>
              <tr>
                <th>Kode Promo</th>
                <th>Tipe & Nilai</th>
                <th>Min. Belanja</th>
                <th>Maks. Diskon</th>
                <th>Pemakaian</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${p.data.vouchers.map(e=>`
                <tr>
                  <td><strong><code>${e.code}</code></strong><div class="tc-muted tc-small">${e.description}</div></td>
                  <td>${e.kind==="percentage"?`${e.value}%`:"Rp"+e.value.toLocaleString("id-ID")}</td>
                  <td>Rp${e.min_spend.toLocaleString("id-ID")}</td>
                  <td>Rp${e.max_discount.toLocaleString("id-ID")}</td>
                  <td>${e.used_count} / ${e.usage_limit}</td>
                  <td><span class="tc-pill ${e.active?"tc-ok":"tc-danger"}">${e.active?"Aktif":"Nonaktif"}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;const t=document.getElementById("tc-btn-add-voucher");t&&(t.onclick=()=>{const e=prompt("Kode Voucher baru (Contoh: EARLYBIRD):");e&&e.trim()&&(p.data.vouchers.push({id:"vch-"+Date.now(),code:e.trim().toUpperCase(),kind:"percentage",value:15,max_discount:75e3,min_spend:15e4,usage_limit:50,used_count:0,per_email_limit:1,active:!0,description:"Voucher promosi"}),p.saveData(),alert("Voucher baru berhasil dibuat!"),this.renderAdminView())})}else this.adminTab==="Audit"&&(n.innerHTML=`
        <div class="tc-tablewrap">
          <table>
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Actor</th>
                <th>Action</th>
                <th>Entity</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              ${p.data.auditLogs.map(t=>`
                <tr>
                  <td class="tc-small">${new Date(t.created_at).toLocaleString("id-ID")}</td>
                  <td><strong>${t.actor}</strong></td>
                  <td><code>${t.action}</code></td>
                  <td>${t.entity_type} (#${t.entity_id.slice(-6)})</td>
                  <td class="tc-small">${t.details}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `);_(n)}}downloadCsv(a,n){const t=new Blob([a],{type:"text/csv;charset=utf-8;"}),e=document.createElement("a");e.href=URL.createObjectURL(t),e.setAttribute("download",n),document.body.appendChild(e),e.click(),document.body.removeChild(e)}}window.addEventListener("DOMContentLoaded",()=>{window.lokarenaApp=new V});
