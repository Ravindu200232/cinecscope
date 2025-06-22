import React from 'react'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AdminSidebar from '@/components/ui/admin-sidebar'


export default function AdminLayout({children}) {
  return (
    <div><SidebarProvider>
      {/* 1 Side bar section */}
        <AdminSidebar/>
  

{/* 2 Main content Section */}
        <SidebarInset>
       <header className='sticky top-0 z-50 border-b bg-background'>
        <div className='h-16 flex items-center justify-between px-4'>
          <h1 className='text-xl font-bold'>Admin Dashboard</h1>

          {/*3 user Dropdown Navigation */}
          <div className='bg-red-600 rounded-full h-10 w-10 flex justify-center items-center'>Hs</div>
        </div>
       </header>

       <div className='flex-1 p-4 md:p-8'>{children}</div>
        </SidebarInset>
        
        </SidebarProvider></div>
  )
}
