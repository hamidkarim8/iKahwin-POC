import PageBreadcrumb from "@/Components/common/PageBreadCrumb";
import PageMeta from "@/Components/common/PageMeta";
import ProfileCard from "@/Components/Profile/ProfileCard";

export default function Index() {
  const handleEdit = () => {
    // Implement your edit logic/modal here
  };

  return (
    <>
      <PageMeta title="Profile" description="Profile" />
      <PageBreadcrumb pageTitle="Profile" />
      <ProfileCard onEdit={handleEdit} />
    </>
  );
}
