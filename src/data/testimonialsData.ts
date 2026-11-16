export type Testimonial = {
  id: string
  quote: string
  name: string
  detail: string
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Shaan made our wedding day feel calm. Looking back at the photos, it really feels like we were living it — not performing for the camera.',
    name: 'Aanya & Rohan',
    detail: 'Wedding · Udaipur',
  },
  {
    id: 't2',
    quote:
      'Our pre-wedding shoot was so easy. Soft light, lots of laughs, and photos we keep sending to each other even now.',
    name: 'Meera & Kabir',
    detail: 'Pre-Wedding · Goa',
  },
  {
    id: 't3',
    quote:
      'We just wanted photos that felt like us. Shaan got that immediately — no stiff poses, just natural moments.',
    name: 'Ishaan & Rhea',
    detail: 'Couple Photography',
  },
  {
    id: 't4',
    quote:
      'From the first message to the final gallery, everything felt personal and clear. I felt looked after the whole way.',
    name: 'Priya Sharma',
    detail: 'Portrait Session',
  },
]
