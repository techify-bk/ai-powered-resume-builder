import { Mail, Phone, MapPin, Globe, LinkedinIcon } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">

      {/* Header */}
      <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: accentColor }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">

          {data.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              <span>{data.personal_info.email}</span>
            </div>
          )}

          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}

          {data.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span>{data.personal_info.location}</span>
            </div>
          )}

          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-1">
              <LinkedinIcon className="size-4" />
              <span className="break-all">{data.personal_info.linkedin}</span>
            </div>
          )}

          {data.personal_info?.website && (
            <div className="flex items-center gap-1">
              <Globe className="size-4" />
              <span className="break-all">{data.personal_info.website}</span>
            </div>
          )}

        </div>
      </header>

      {/* Summary */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p>{data.professional_summary}</p>
        </section>
      )}

    </div>
  );
};

export default ClassicTemplate;