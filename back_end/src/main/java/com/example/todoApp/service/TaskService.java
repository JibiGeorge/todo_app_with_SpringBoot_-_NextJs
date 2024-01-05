package com.example.todoApp.service;

import com.example.todoApp.dao.TaskDao;
import com.example.todoApp.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TaskService {

    @Autowired
    TaskDao taskDao;

    public ResponseEntity<Map<String, Object>> createNewTask(Task task_name) {
        Map<String, Object> response = new HashMap<>();

        try {
            Task savedTask = taskDao.save(task_name);
            response.put("data", savedTask);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            response.put("error", "Something went wrong");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<Task>> getAllTAsks() {
        try {
            List<Task> allTasks = taskDao.findAll();
            return new ResponseEntity<>(allTasks, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<Map<String, Object>> getTaskById(String id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Task> taskData = taskDao.findById(Integer.valueOf(id));
            if (taskData.isPresent()) {
                response.put("data", taskData);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("error", "Task not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        response.put("error", "Something went wrong");
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<Map<String, Object>> updateTask(String id, String task_name) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Task> taskData = taskDao.findById(Integer.valueOf(id));

            if (taskData.isPresent()) {
                Task task = taskData.get();
                task.setTask_name(task_name);
                taskDao.save(task);
                response.put("status", "Updated Successfully");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("error", "Task not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        response.put("error", "Something went wrong");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<Map<String, Object>> deleteTaskById(String id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Task> taskData = taskDao.findById(Integer.valueOf(id));

            if (taskData.isPresent()) {
                taskDao.deleteById(Integer.valueOf(id));
                response.put("status", "Deleted Successfully");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("error", "Task not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        response.put("error", "Something went wrong");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<Map<String, Object>> toggleTaskCompletion(String id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Task> taskData = taskDao.findById(Integer.valueOf(id));

            if (taskData.isPresent()) {
                Task task = taskData.get();
                task.setCompleted(!task.isCompleted());
                taskDao.save(task);

                String completionStatus = task.isCompleted() ? "completed" : "incomplete";
                response.put("status", "Task marked as " + completionStatus);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("error", "Task not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        response.put("error", "Something went wrong");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
