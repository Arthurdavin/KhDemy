import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTeacherCoursesQuery, useDeleteCourseMutation } from "../../features/courses/coursesApi";
import { toast } from "react-toastify";
import { Eye, Pencil, Trash2, ArrowLeft, ChevronRight } from "lucide-react";

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
const breadcrumbs = [
  { label: "Dashboard",      to: "/teacher/dashboard", bold: true  },
  { label: "All Courses",    to: null,                 active: true },
  { label: "All book",       to: "/teacher/all-books"              },
  { label: "Delete lesson",  to: "/teacher/delete-lesson"          },
  { label: "Delete book",    to: "/teacher/delete-book"            },
]

// ─── Delete Modal ─────────────────────────────────────────────────────────────
const DeleteModal = ({ course, onConfirm, onCancel, isDeleting }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    onClick={onCancel}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-1 w-full bg-gradient-to-r from-red-400 to-rose-500" />
      <div className="px-8 py-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full border-2 border-red-300 flex items-center justify-center mb-5">
          <Trash2 size={26} className="text-red-400" strokeWidth={1.75} />
        </div>
        <h2 className="text-xl font-black text-gray-800 mb-2">Delete Course?</h2>
        <p className="text-sm font-semibold text-gray-600 mb-1 line-clamp-2">{course?.title}</p>
        <p className="text-xs text-gray-400 mb-7">This action cannot be undone.</p>
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm mb-3 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
        >
          <Trash2 size={14} /> Yes, Delete
        </button>
        <button
          onClick={onCancel}
          className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm transition-all hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <ArrowLeft size={14} /> Cancel
        </button>
      </div>
    </div>
  </div>
)

// ─── Skeleton row ─────────────────────────────────────────────────────────────
const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4"><div className="w-16 h-12 rounded-xl bg-gray-100" /></td>
    <td className="px-6 py-4"><div className="h-4 w-36 bg-gray-100 rounded-full" /></td>
    <td className="px-6 py-4"><div className="h-3 w-48 bg-gray-100 rounded-full" /></td>
    <td className="px-6 py-4"><div className="h-3 w-8 bg-gray-100 rounded-full mx-auto" /></td>
    <td className="px-6 py-4"><div className="h-3 w-10 bg-gray-100 rounded-full mx-auto" /></td>
    <td className="px-6 py-4">
      <div className="flex gap-2 justify-end">
        <div className="w-9 h-9 rounded-lg bg-gray-100" />
        <div className="w-9 h-9 rounded-lg bg-gray-100" />
        <div className="w-9 h-9 rounded-lg bg-gray-100" />
      </div>
    </td>
  </tr>
)

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AllCoursesTable() {
  const navigate = useNavigate()
  const [courseToDelete, setCourseToDelete] = useState(null)

  const { data: courses = [], isLoading, isError } = useGetTeacherCoursesQuery()
  const [deleteCourse, { isLoading: isDeleting }]  = useDeleteCourseMutation()

  const handleConfirmDelete = async () => {
    if (!courseToDelete) return
    try {
      await deleteCourse(courseToDelete.id).unwrap()
      toast.success("Course deleted.")
    } catch {
      toast.error("Failed to delete course.")
    } finally {
      setCourseToDelete(null)
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-100 px-10 py-5">
        <nav className="flex items-center gap-2 flex-wrap">
          {breadcrumbs.map((b, i) => (
            <span key={b.label} className="flex items-center gap-2">
              <button
                onClick={() => b.to && navigate(b.to)}
                className={`text-sm transition-colors ${
                  b.bold   ? "font-black text-gray-900 hover:text-indigo-600" :
                  b.active ? "font-semibold text-indigo-500"                  :
                             "text-gray-400 underline underline-offset-2 hover:text-gray-600"
                } ${!b.to ? "cursor-default" : "cursor-pointer"}`}
              >
                {b.label}
              </button>
              {i < breadcrumbs.length - 1 && (
                <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* ── Content ── */}
      <div className="px-10 py-10">
        <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tight">All Courses</h1>

        {isError && (
          <div className="text-sm text-red-400 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6">
            ⚠️ Failed to load courses.
          </div>
        )}

        {/* ── Table ── */}
        <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full">
            {/* Header */}
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest w-32">
                  Thumbnails
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">
                  Courses Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">
                  Descriptions
                </th>
                <th className="px-6 py-4 text-center text-xs font-black text-gray-400 uppercase tracking-widest">
                  Total Quizzes
                </th>
                <th className="px-6 py-4 text-center text-xs font-black text-gray-400 uppercase tracking-widest">
                  Price
                </th>
                <th className="px-6 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-widest">
                  Action
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
              ) : courses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center text-gray-400">
                    <p className="text-4xl mb-3">📭</p>
                    <p className="text-sm font-semibold">No courses yet</p>
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-indigo-50/30 transition-colors duration-150"
                  >
                    {/* Thumbnail */}
                    <td className="px-6 py-4">
                      {course.thumbnail_url ? (
                        <img
                          src={course.thumbnail_url}
                          alt={course.title}
                          className="w-16 h-12 rounded-xl object-cover shadow-sm"
                        />
                      ) : (
                        <div className="w-16 h-12 rounded-xl bg-gradient-to-br from-indigo-800 to-indigo-600 flex items-center justify-center shadow-sm">
                          <span className="text-white text-[10px] font-black text-center leading-tight px-1">
                            {course.title?.slice(0, 6)}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Course Name */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-800 line-clamp-1">{course.title}</p>
                    </td>

                    {/* Description */}
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                        {course.description ?? "No description provided."}
                      </p>
                    </td>

                    {/* Total Quizzes */}
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-semibold text-gray-700">
                        {course.total_quizzes ?? course.quizzes ?? "—"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 text-center">
                      <span className={`text-sm font-bold ${
                        course.type === "Free" ? "text-emerald-500" : "text-amber-500"
                      }`}>
                        {course.type ?? "—"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        {/* View */}
                        <button
                          onClick={() => navigate(`/teacher/courses/${course.id}`)}
                          className="w-9 h-9 rounded-lg border-2 border-rose-200 bg-rose-50 flex items-center justify-center hover:bg-rose-100 hover:border-rose-300 transition-all"
                          title="View"
                        >
                          <Eye size={14} className="text-rose-400" />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => navigate(`/dashboard/courses/${course.id}/edit`)}
                          className="w-9 h-9 rounded-lg border-2 border-amber-200 bg-amber-50 flex items-center justify-center hover:bg-amber-100 hover:border-amber-300 transition-all"
                          title="Edit"
                        >
                          <Pencil size={14} className="text-amber-400" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setCourseToDelete(course)}
                          className="w-9 h-9 rounded-lg border-2 border-red-200 bg-red-50 flex items-center justify-center hover:bg-red-100 hover:border-red-300 transition-all"
                          title="Delete"
                        >
                          <Trash2 size={14} className="text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Delete Modal ── */}
      {courseToDelete && (
        <DeleteModal
          course={courseToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={() => setCourseToDelete(null)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  )
}