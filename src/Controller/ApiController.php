<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class ApiController extends AbstractController
{
    // In-memory storage for demo purposes
    private static array $items = [
        ['id' => 1, 'name' => 'Item 1', 'description' => 'First sample item'],
        ['id' => 2, 'name' => 'Item 2', 'description' => 'Second sample item'],
        ['id' => 3, 'name' => 'Item 3', 'description' => 'Third sample item'],
    ];

    #[Route('/items', name: 'items_list', methods: ['GET'])]
    public function getItems(): JsonResponse
    {
        return $this->json(self::$items);
    }

    #[Route('/items/{id}', name: 'items_get', methods: ['GET'])]
    public function getItem(int $id): JsonResponse
    {
        foreach (self::$items as $item) {
            if ($item['id'] === $id) {
                return $this->json($item);
            }
        }

        return $this->json(['error' => 'Item not found'], 404);
    }

    #[Route('/items', name: 'items_create', methods: ['POST'])]
    public function createItem(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name']) || !isset($data['description'])) {
            return $this->json(['error' => 'Name and description are required'], 400);
        }

        $newItem = [
            'id' => count(self::$items) + 1,
            'name' => $data['name'],
            'description' => $data['description'],
        ];

        self::$items[] = $newItem;

        return $this->json($newItem, 201);
    }

    #[Route('/items/{id}', name: 'items_delete', methods: ['DELETE'])]
    public function deleteItem(int $id): JsonResponse
    {
        foreach (self::$items as $key => $item) {
            if ($item['id'] === $id) {
                unset(self::$items[$key]);
                self::$items = array_values(self::$items); // Re-index array
                return $this->json(['message' => 'Item deleted successfully']);
            }
        }

        return $this->json(['error' => 'Item not found'], 404);
    }
}
