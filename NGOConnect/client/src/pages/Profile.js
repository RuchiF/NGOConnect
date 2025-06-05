import React, { useState } from "react";
import { getUser } from "../utils";
import Sidebar from "../components/Sidebar";
import styles from "./Profile.module.css";

// Example testimonials (replace with real data or fetch from backend)
const testimonials = [
  {
    name: "Amit Sharma",
    text: "Volunteering with this NGO was a life-changing experience. Their impact is real!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Singh",
    text: "The team is so dedicated and the events are always well organized.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahul Verma",
    text: "I learned so much and made great friends while helping the community.",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

const Profile = () => {
  const user = getUser();
  const [current, setCurrent] = useState(0);

  const nextTestimonial = () => setCurrent((current + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profileMain}>
        <div className={styles.profileCard}>
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name || "NGO"
            )}&background=0A66C2&color=fff&size=128`}
            alt="NGO Logo"
            className={styles.avatar}
          />
          <h2 className={styles.name}>{user.name}</h2>
          <div className={styles.info}>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Type:</strong> NGO
            </div>
          </div>
          <div className={styles.aboutSection}>
            <h3>About {user.name}</h3>
            <p>
              {/* Replace this with real NGO description from backend if available */}
              We are committed to making a positive impact in our community
              through various events and volunteer programs. Our mission is to
              empower people and bring meaningful change.
            </p>
          </div>
        </div>

        <div className={styles.carouselSection}>
          <h3>Hear from People</h3>
          <div className={styles.carousel}>
            <button
              className={styles.carouselBtn}
              onClick={prevTestimonial}
              aria-label="Previous"
            >
              &#8592;
            </button>
            <div className={styles.testimonial}>
              <img
                src={testimonials[current].avatar}
                alt={testimonials[current].name}
                className={styles.testimonialAvatar}
              />
              <div className={styles.testimonialText}>
                "{testimonials[current].text}"
              </div>
              <div className={styles.testimonialName}>
                - {testimonials[current].name}
              </div>
            </div>
            <button
              className={styles.carouselBtn}
              onClick={nextTestimonial}
              aria-label="Next"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
