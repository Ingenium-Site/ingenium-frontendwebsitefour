import { useEffect, useMemo, useRef, useState } from "react";
import { X, Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { services as allServices } from "../../data/services";
import "./servicePicker.css";

export default function ServicePickerModal({
  open,
  onClose,
  value = [],
  onChange,
  max = 10,
  title = "Services provided",
}) {
  const [query, setQuery] = useState("");
  const dialogRef = useRef(null);
  const inputRef = useRef(null);

  const selected = value;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allServices;
    return allServices.filter((s) => s.name.toLowerCase().includes(q));
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

  const contactHref =
    selected.length > 0
      ? `/contact?services=${encodeURIComponent(selected.map((s) => s.name).join(", "))}`
      : "/contact";

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
            <Link className="spBtn primary" to={contactHref} onClick={onClose}>
              Continue <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
