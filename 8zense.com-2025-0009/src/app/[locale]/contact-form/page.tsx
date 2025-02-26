"use client";

import React from 'react';
import { Form, Input, Button, message, Space, Divider, Typography } from 'antd';
import Head from 'next/head';
import { FaUser } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import { FaMessage } from 'react-icons/fa6';
import { z } from 'zod';
import  Container from '@/src/components/container';
import Paragraph from 'antd/es/typography/Paragraph';




const { TextArea } = Input;
const { Text } = Typography;

// Zod schema for form validation
const contactSchema = z.object({
  name: z.string().min(4, 'Name must be at least 4 characters').max(50, 'Name must not exceed 50 characters'),
  email: z.string().email('Invalid email address').regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email must be a valid format"),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(100, 'Subject must not exceed 100 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters').max(1000, 'Message must not exceed 1000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage: React.FC = () => {
  const [form] = Form.useForm<ContactFormData>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onFinish = async (values: ContactFormData) => {
    setIsSubmitting(true);
    try {
      contactSchema.parse(values);

      const response = await fetch('/api/v1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        message.error('Failed to send message. Please try again.');
        setIsSubmitting(false); 
      }

      const data = await response.json();

      if (data.message === 'success') {
        message.success('Message sent successfully!');
        setIsSubmitting(false);
        form.resetFields();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          message.error(err.message);
          setIsSubmitting(false);
        });
      } else {
        message.error('Failed to send message. Please try again.');
        setIsSubmitting(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">Get in Touch</h2>
          <p className="mt-1 mb-4 text-center text-sm text-gray-600">
            I'd love to hear from you! Fill out the form below to get in touch.
          </p>
        </div>
        <Form
          form={form}
          name="contact"
          onFinish={onFinish}
          layout="vertical"
          className="mt-8 space-y-6"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input prefix={<FaUser className="site-form-item-icon" />} placeholder="Your Name" size="large" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input prefix={<MdMail className="site-form-item-icon" />} placeholder="Your Email" size="large" />
          </Form.Item>
          <Form.Item
            name="subject"
            rules={[{ required: true, message: 'Please input a subject!' }]}
          >
            <Input prefix={<FaMessage className="site-form-item-icon" />} placeholder="Subject" size="large" />
          </Form.Item>
          <Form.Item
            name="message"
            rules={[{ required: true, message: 'Please input your message!' }]}
          >
            <TextArea
              placeholder="Your Message"
              autoSize={{ minRows: 4, maxRows: 8 }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </Form.Item>
        </Form>
      </div>
 );
};
export default ContactPage;

 