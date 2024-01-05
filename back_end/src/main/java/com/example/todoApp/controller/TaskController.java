package com.example.todoApp.controller;

import com.example.todoApp.model.Task;
import com.example.todoApp.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("task")
public class TaskController {

    @Autowired
    TaskService taskService;

    @PostMapping("add")
    public ResponseEntity<Map<String, Object>> createTask(@RequestBody Task task_name) {
        return taskService.createNewTask(task_name);
    }

    @GetMapping("getAllTasks")
    public ResponseEntity<List<Task>> getAllTask() {
        return taskService.getAllTAsks();
    }

    @GetMapping("getTask/{id}")
    public ResponseEntity<Map<String, Object>> getTaskById(@PathVariable String id) {
        return taskService.getTaskById(id);
    }

    @DeleteMapping("deleteTask/{id}")
    public ResponseEntity<Map<String, Object>> deleteTask(@PathVariable String id) {
        return taskService.deleteTaskById(id);
    }

    @PutMapping("updateTask/{id}")
    public ResponseEntity<Map<String, Object>> updateTask(@PathVariable String id, @RequestBody Map<String, String> task_name) {
        String task = task_name.get("task_name");
        return taskService.updateTask(id, task);
    }

    @PutMapping("toggleTask/{id}")
    public ResponseEntity<Map<String, Object>> toggleTaskCompletion(@PathVariable String id) {
        return taskService.toggleTaskCompletion(id);
    }
}
