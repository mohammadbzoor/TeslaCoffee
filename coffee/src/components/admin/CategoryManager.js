import React, { useEffect, useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { FaEdit, FaPlus, FaSave, FaTimes, FaTrash } from "react-icons/fa";

import useCategories from "../../hooks/useCategories";
import {
  addCategory,
  deleteCategory,
  seedDefaultCategories,
  updateCategory,
} from "../../utils/categoryHelpers";

export default function CategoryManager() {
  const { categories, loading, error, permissionDenied } = useCategories();
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedAttempted, setSeedAttempted] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const shouldSeed =
      !permissionDenied &&
      !loading &&
      categories.length > 0 &&
      categories.every((category) => category.isDefault);

    if (!shouldSeed || seeding || seedAttempted) return;

    const seed = async () => {
      setSeeding(true);
      setSeedAttempted(true);
      await seedDefaultCategories();
      setSeeding(false);
    };

    seed();
  }, [categories, loading, permissionDenied, seedAttempted, seeding]);

  const handleAdd = async (event) => {
    event.preventDefault();
    if (!newCategory.trim()) return;

    setSaving(true);
    const result = await addCategory(newCategory, categories.length);
    setSaving(false);

    if (result.success) {
      setNewCategory("");
      setMessage("تمت إضافة التصنيف.");
    } else {
      setMessage(
        result.error?.code === "permission-denied"
          ? "لا توجد صلاحية لإضافة التصنيف. حدّث قواعد Firestore أولاً."
          : "تعذرت إضافة التصنيف."
      );
    }
  };

  const startEdit = (category) => {
    setEditingId(category.id);
    setEditingName(category.name);
    setMessage("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleUpdate = async (category) => {
    if (!editingName.trim()) return;

    setSaving(true);
    const result = await updateCategory(category.id, editingName);
    setSaving(false);

    if (result.success) {
      cancelEdit();
      setMessage("تم تعديل التصنيف.");
    } else {
      setMessage(
        result.error?.code === "permission-denied"
          ? "لا توجد صلاحية لتعديل التصنيف. حدّث قواعد Firestore أولاً."
          : "تعذر تعديل التصنيف."
      );
    }
  };

  const handleDelete = async (category) => {
    if (category.name === "الكل") {
      setMessage("لا يمكن حذف تصنيف الكل لأنه مسؤول عن عرض جميع المنتجات.");
      return;
    }

    if (!window.confirm(`هل أنت متأكد من حذف تصنيف "${category.name}"؟`)) return;

    const result = await deleteCategory(category.id);
    setMessage(
      result.success
        ? "تم حذف التصنيف."
        : result.error?.code === "permission-denied"
        ? "لا توجد صلاحية لحذف التصنيف. حدّث قواعد Firestore أولاً."
        : "تعذر حذف التصنيف."
    );
  };

  if (loading || seeding) {
    return (
      <Card className="admin-category-card">
        <Card.Body className="text-center py-4">
          <Spinner animation="border" variant="warning" />
          <p className="mt-3 text-muted mb-0">جاري تحميل التصنيفات...</p>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="admin-category-card">
        <Card.Body className="text-danger text-center">
          حدث خطأ أثناء تحميل التصنيفات: {error.message}
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="admin-category-card mb-4">
      <Card.Body>
        <div className="admin-category-header">
          <div>
            <h5>إدارة التصنيفات</h5>
            <p>أضف أو عدّل أو احذف تصنيفات المنتجات من نفس لوحة الإدارة.</p>
          </div>
        </div>

        {message && <div className="admin-inline-message">{message}</div>}

        {permissionDenied && (
          <div className="admin-inline-message admin-warning-message">
            يتم عرض التصنيفات الافتراضية حالياً، لكن الإضافة والتعديل والحذف تحتاج صلاحيات
            Firestore على collection: menuCategories.
          </div>
        )}

        <Form onSubmit={handleAdd} className="admin-category-form">
          <Form.Control
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            placeholder="اسم التصنيف الجديد"
            className="text-end"
            disabled={permissionDenied}
          />
          <Button type="submit" variant="success" disabled={saving || permissionDenied}>
            <FaPlus /> إضافة
          </Button>
        </Form>

        <div className="admin-category-list">
          {categories.map((category) => (
            <div key={category.id} className="admin-category-row">
              {editingId === category.id ? (
                <Form.Control
                  value={editingName}
                  onChange={(event) => setEditingName(event.target.value)}
                  className="text-end"
                  autoFocus
                />
              ) : (
                <span>{category.name}</span>
              )}

              <div className="d-flex gap-2">
                {editingId === category.id ? (
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleUpdate(category)}
                      disabled={saving}
                    >
                      <FaSave />
                    </Button>
                    <Button variant="outline-secondary" size="sm" onClick={cancelEdit}>
                      <FaTimes />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => startEdit(category)}
                      disabled={category.name === "الكل" || permissionDenied}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(category)}
                      disabled={category.name === "الكل" || permissionDenied}
                    >
                      <FaTrash />
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}
