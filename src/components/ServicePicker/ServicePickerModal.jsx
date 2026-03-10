import { useEffect, useMemo, useRef, useState } from "react";
import { X, Search, ArrowRight, BadgeCheck, Globe, Mic, Megaphone, Rocket, Boxes } from "lucide-react";
import { Link } from "react-router-dom";
import { services as allServices } from "../../data/services";
import { expertisePackages, bespokePackage } from "../../data/expertisePackages";
import "./servicePicker.css";

/* Build expertise items in the same shape as allServices */
const expertiseIconMap = {
  "corporate-brand-package": BadgeCheck,
  "corporate-website-package": Globe,
  "executive-communications": Mic,
  "authority-social-media-retainer": Megaphone,
  "launch-campaign": Rocket,
};

const expertiseServiceItems = [
  ...Object.entries(expertisePackages).map(([slug, pkg]) => ({
    key: slug,
    name: pkg.title,
    desc: pkg.subtitle,
    icon: expertiseIconMap[slug] || Boxes,
    products: pkg.sections?.map((s) => s.heading) || [],
  })),
  {
    key: "ingenium-bespoke-package",
    name: bespokePackage.title,
    desc: bespokePackage.subtitle,
    icon: Boxes,
    products: bespokePackage.categories?.map((c) => c.title) || [],
  },
];

const combinedServices = [...allServices, ...expertiseServiceItems];

export default function ServicePickerModal({
  open,
  onClose,
  value = [],
  onChange,
  max = 6,
  title = "Services provided",
}) {
  const [query, setQuery] = useState("");
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const selected = value;

  // Validate form inputs
  const isFormValid = () => {
    return fullName.trim() !== "" && 
           email.trim() !== "" && 
           /\S+@\S+\.\S+/.test(email) && 
           selected.length > 0;
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return combinedServices;
    return combinedServices.filter((s) => s.name.toLowerCase().includes(q));
  }, [query]);

  const selectedSet = useMemo(() => new Set(selected.map((s) => s.key)), [selected]);

  const toggle = (service) => {
    if (selectedSet.has(service.key)) {
      onChange?.(selected.filter((s) => s.key !== service.key));
      return;
    }
    if (selected.length >= max) return;
    onChange?.([...selected, service]);
  };

  const remove = (key) => {
    onChange?.(selected.filter((s) => s.key !== key));
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      window.clearTimeout(t);
      prev?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  // Generate mailto link with all information
  const generateMailtoLink = () => {
    const subject = encodeURIComponent(`Service Inquiry from ${fullName}`);
    const servicesList = selected.map(s => s.name).join(", ");
    const body = encodeURIComponent(
      `Hello,\n\nMy name is ${fullName}.\nMy email is ${email}.\n\nI'm interested in the following services:\n${servicesList}\n\nPlease contact me for more information.\n\nBest regards,\n${fullName}`
    );
    
    return `mailto:info@ingeniumhub.com?subject=${subject}&body=${body}`;
  };

  // Function to handle submit action (will be useful when connecting to API)
  const handleSubmit = async () => {
    // This is where you could add your API call
    // Example:
    /*
    try {
      await fetch('/api/service-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          services: selected.map(s => ({ key: s.key, name: s.name })),
        }),
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    }
    */

    // For now, just close the modal
    onClose?.();
  };

  return (
    <div className="spBackdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="spDialog"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={dialogRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Contact Information Fields */}
        <div className="spContactInfo">
          <div className="spInputContainer">
            <label htmlFor="fullName" className="spLabel">Full Name *</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="spTextInput"
              required
            />
          </div>
          
          <div className="spInputContainer">
            <label htmlFor="email" className="spLabel">Email Address *</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="spTextInput"
              required
            />
          </div>
        </div>

        <div className="spHeader">
          <div className="spHeaderText">
            <h2 className="spTitle">{title}</h2>
            <p className="spSub">Add up to {max} services</p>
          </div>

          <button type="button" className="spClose" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="spSearch">
          <Search size={18} aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services"
            aria-label="Search services"
          />
        </div>

        {selected.length > 0 ? (
          <div className="spSelected" aria-label="Selected services">
            {selected.map((s) => (
              <button
                type="button"
                key={s.key}
                className="spChip isSelected"
                onClick={() => remove(s.key)}
              >
                {s.name} <span className="spChipX" aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="spHint">Pick services you are interested in. You can update this anytime.</div>
        )}

     <div className="spList" aria-label="Available services">
  {filtered.map((s) => {
    const Icon = s.icon;
    const isOn = selectedSet.has(s.key);
    const disabled = !isOn && selected.length >= max;

    return (
      <button
        type="button"
        key={s.key}
        className={`spRow ${isOn ? "isOn" : ""}`}
        onClick={() => toggle(s)}
        disabled={disabled}
      >
        <span className="spRowIcon" aria-hidden="true">
          <Icon size={18} strokeWidth={1.7} />
        </span>
        <span className="spRowText">
          <span className="spRowName">{s.name}</span>
          <span className="spRowDesc">{s.desc}</span>
        </span>
        <span className="spRowPill" aria-hidden="true">
          {isOn ? "Added" : "Add"}
        </span>
      </button>
    );
  })}
</div>

        <div className="spFooter">
          <div className="spCount">
            {selected.length}/{max} selected
          </div>
          <div className="spActions">
            <button type="button" className="spBtn ghost" onClick={() => onChange?.([])}>
              Clear
            </button>
            <a 
              className={`spBtn primary ${!isFormValid() ? 'disabled' : ''}`} 
              href={isFormValid() ? generateMailtoLink() : '#'}
              onClick={(e) => {
                if (!isFormValid()) {
                  e.preventDefault();
                  alert('Please fill in all required fields and select at least one service');
                  return;
                }
                handleSubmit();
              }}
              style={{ pointerEvents: !isFormValid() ? 'none' : 'auto' }}
            >
              Submit <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}