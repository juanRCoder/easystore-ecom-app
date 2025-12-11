import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BoxIcon, ChevronRight, LayoutGrid, NotepadText, UserRound } from "lucide-react";
import { AdminLayout } from "@/layouts/AdminLayout";

const Dashboard = () => {
  const navigate = useNavigate();

  const adminActions = [
    {
      icon: BoxIcon,
      title: "Productos",
      link: "products",
      description: "Gestionar productos y stock",
    },
    {
      icon: LayoutGrid,
      title: "Categorias",
      link: "categories",
      description: "Organizar categorias",
    },
    {
      icon: NotepadText,
      title: "Ordenes",
      link: "orders",
      description: "Ver y administrar ordenes",
    },
  ];
  const imgUser = ''

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className='bg-background text-foreground flex p-4 border-b'>
        <ArrowLeft onClick={() => navigate('/')} strokeWidth={3} className='cursor-pointer' />
        <h2 className="text-2xl text-center flex-1 font-semibold">Panel de administración </h2>
      </div>
      {/* CONTENT */}
      <div className="bg-sidebar text-foreground flex-1 flex flex-col px-4 gap-5">
        <div className="bg-card flex flex-col justify-center items-center mt-10 py-5 rounded-md outline-1 outline-border">
          {imgUser ? (
            <img
              src={'/user_default.png'}
              className="h-36 w-36 border-8 border-border rounded-full"
            />
          ) : (
            <div className="border-8 border-border rounded-full p-4">
              <UserRound size={96} strokeWidth={1.2} />
            </div>
          )}
          <p className="mt-6 mb-1 text-3xl font-semibold">Ricardo</p>
          <p className="text-2xl">Administrador</p>
        </div>
        <section className="flex flex-col gap-5 my-10">
          {adminActions.map(action => (
            <Link key={action.title} to={`/admin/${action.link}`} className="flex items-center justify-between gap-4 py-4 px-3 cursor-pointer rounded-md bg-card outline-1 outline-border">
              <div className="flex items-center gap-4">
                <action.icon size={40} />
                <div>
                  <p className="font-semibold">{action.title}</p>
                  <p className="font-light">{action.description}</p>
                </div>
              </div>
              <ChevronRight size={40} strokeWidth={1.5} />
            </Link>
          ))}
        </section>
      </div>
    </AdminLayout>
  )
}

export default Dashboard;