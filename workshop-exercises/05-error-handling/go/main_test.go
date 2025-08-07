package main

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

// These tests currently FAIL because of poor error handling!
// Your task: Fix getUserHandler to make these tests pass

func TestGetUser_ValidID(t *testing.T) {
	req := httptest.NewRequest("GET", "/user?id=1", nil)
	w := httptest.NewRecorder()
	
	getUserHandler(w, req)
	
	if w.Code != http.StatusOK {
		t.Errorf("Expected status 200, got %d", w.Code)
	}
	
	expected := `{"id": 1, "name": "Alice"}`
	if strings.TrimSpace(w.Body.String()) != expected {
		t.Errorf("Expected %s, got %s", expected, w.Body.String())
	}
}

func TestGetUser_InvalidID_ShouldNotPanic(t *testing.T) {
	req := httptest.NewRequest("GET", "/user?id=invalid", nil)
	w := httptest.NewRecorder()
	
	// This test will FAIL because the handler panics!
	defer func() {
		if r := recover(); r != nil {
			t.Errorf("Handler panicked: %v", r)
		}
	}()
	
	getUserHandler(w, req)
	
	// Should return 400 Bad Request, not panic!
	if w.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400 for invalid ID, got %d", w.Code)
	}
}

func TestGetUser_NegativeID_ShouldNotPanic(t *testing.T) {
	req := httptest.NewRequest("GET", "/user?id=-1", nil)
	w := httptest.NewRecorder()
	
	// This test will FAIL because the handler panics!
	defer func() {
		if r := recover(); r != nil {
			t.Errorf("Handler panicked: %v", r)
		}
	}()
	
	getUserHandler(w, req)
	
	// Should return 400 Bad Request, not panic!
	if w.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400 for negative ID, got %d", w.Code)
	}
}

func TestGetUser_LargeID_ShouldNotPanic(t *testing.T) {
	req := httptest.NewRequest("GET", "/user?id=9999", nil)
	w := httptest.NewRecorder()
	
	// This test will FAIL because the handler panics!
	defer func() {
		if r := recover(); r != nil {
			t.Errorf("Handler panicked: %v", r)
		}
	}()
	
	getUserHandler(w, req)
	
	// Should return 400 Bad Request, not panic!
	if w.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400 for large ID, got %d", w.Code)
	}
}

func TestGetUser_NotFound_ShouldReturn404(t *testing.T) {
	req := httptest.NewRequest("GET", "/user?id=999", nil)
	w := httptest.NewRecorder()
	
	getUserHandler(w, req)
	
	// Should return 404 Not Found when user doesn't exist
	if w.Code != http.StatusNotFound {
		t.Errorf("Expected status 404 for non-existent user, got %d", w.Code)
	}
}

func TestGetUser_MissingID_ShouldReturn400(t *testing.T) {
	req := httptest.NewRequest("GET", "/user", nil)
	w := httptest.NewRecorder()
	
	getUserHandler(w, req)
	
	// Should return 400 Bad Request when ID is missing
	if w.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400 for missing ID, got %d", w.Code)
	}
}
