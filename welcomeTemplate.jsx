// welcomeTemplate.js

function getWelcomeHTML() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Wanderlust API Server</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    </head>
    <body class="bg-slate-900 text-slate-100 font-sans min-h-screen flex items-center justify-center p-4">
      
      <div class="max-w-xl w-full bg-slate-800 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm p-6 md:p-8 space-y-6">
        
        <!-- Header Section -->
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 animate-pulse">
            <i class="fa-solid fa-earth-americas text-3xl"></i>
          </div>
          <div>
            <h1 class="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Wanderlust Server
            </h1>
            <p class="text-sm text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span class="h-2 w-2 rounded-full bg-emerald-500 inline-block"></span>
              Operational & Running smoothly
            </p>
          </div>
        </div>

        <hr class="border-slate-700/60" />

        <!-- Quick Stats / Status -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-slate-850 p-4 rounded-xl border border-slate-700/30">
            <span class="text-xs text-slate-400 block mb-1">Database Connected</span>
            <span class="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <i class="fa-leaf text-emerald-500"></i> MongoDB Atlas
            </span>
          </div>
          <div class="bg-slate-850 p-4 rounded-xl border border-slate-700/30">
            <span class="text-xs text-slate-400 block mb-1">Environment</span>
            <span class="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <i class="fa-server text-blue-400"></i> Production Mode
            </span>
          </div>
        </div>

        <!-- Available Endpoints Tracker -->
        <div class="space-y-3">
          <h3 class="text-sm font-medium text-slate-400 uppercase tracking-wider">Available Endpoints</h3>
          
          <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
            <div class="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-lg text-xs">
              <span class="font-mono text-blue-400 font-bold bg-blue-950/50 px-2 py-0.5 rounded">GET</span>
              <span class="font-mono text-slate-300">/destination</span>
            </div>
            <div class="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-lg text-xs">
              <span class="font-mono text-emerald-400 font-bold bg-emerald-950/50 px-2 py-0.5 rounded">POST</span>
              <span class="font-mono text-slate-300">/destination</span>
            </div>
            <div class="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-lg text-xs">
              <span class="font-mono text-purple-400 font-bold bg-purple-950/50 px-2 py-0.5 rounded">PATCH</span>
              <span class="font-mono text-slate-300">/destination/:id</span>
            </div>
            <div class="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-lg text-xs">
              <span class="font-mono text-amber-400 font-bold bg-amber-950/50 px-2 py-0.5 rounded">GET</span>
              <span class="font-mono text-slate-300">/booking/:userId</span>
            </div>
            <div class="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-lg text-xs">
              <span class="font-mono text-rose-400 font-bold bg-rose-950/50 px-2 py-0.5 rounded">DELETE</span>
              <span class="font-mono text-slate-300">/booking/:bookingId</span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center pt-2">
          <p class="text-xs text-slate-500">
            &copy; ${new Date().getFullYear()} Wanderlust API. All rights reserved.
          </p>
        </div>

      </div>

    </body>
    </html>
  `;
}

// ফাংশনটিকে এক্সপোর্ট করে দেওয়া হলো যেন মেইন ফাইল থেকে কল করা যায়
module.exports = getWelcomeHTML;