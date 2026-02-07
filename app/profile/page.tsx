import ProfileForm from "@/components/profile/profile-form";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">
            Account Profile
          </h1>
          <p className="text-slate-600">
            Update your customer details, address, and contact info.
          </p>
        </div>
        <ProfileForm />
      </div>
    </div>
  );
}
