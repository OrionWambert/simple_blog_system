import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { AdminPostList } from '@/components/organisms/admin_post_list'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/admin')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  })

  if (user?.role !== 'ADMIN') {
    redirect('/') 
  }

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      author: {
        select: {
          name: true,
          image: true
        }
      }
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gérez vos articles ici
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <AdminPostList posts={posts} />
        </div>
      </div>
    </div>
  )
}
