// pages/api/reviews.js

import fs from 'fs';
import path from 'path';

const reviewsFilePath = path.join(process.cwd(), 'data', 'reviews.json');

function getReviews() {
  try {
    const data = fs.readFileSync(reviewsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveReviews(reviews) {
  fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2));
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const reviews = getReviews();
    return res.status(200).json(reviews);
  }

  if (req.method === 'POST') {
    const { name, rating, comment } = req.body;
    if (!name || !rating || !comment) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const reviews = getReviews();
    const newReview = { name, rating, comment, date: new Date().toISOString() };
    reviews.push(newReview);

    try {
      saveReviews(reviews);
      return res.status(201).json({ message: 'Review saved successfully!', review: newReview });
    } catch (err) {
      console.error('Error saving review:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
