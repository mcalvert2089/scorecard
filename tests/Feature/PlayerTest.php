<?php
namespace Tests\Unit;

use App\Player;
use App\Team;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PlayerTest extends TestCase
{
	use DatabaseTransactions;
	private $user;

    public function setUp() {
        parent::setUp();
        $this->user = $this->getUser();
    }

    /** @test */
    public function user_can_retrieve_a_player()
    { 
    	$player = factory(Player::class)->create();

    	$response = $this->actingAs($this->user, 'api')
    		->get('/api/players/' . $player->id);
    	$response->assertStatus(200);

    	$this->assertNotNull($response->json());
    }
    
    /** @test */
    public function user_can_create_a_player()
    {   
    	$team = factory(Team::class)->create();

    	$data = [];
    	$data['first_name'] = 'Shoeless Joe';
    	$data['last_name'] = 'Jackson';
    	$data['team_id'] = $team->id;
    	$data['user_id'] = $this->user->id;
    	$data['bats'] = 'L';
    	$data['throws'] = 'R';

    	$response = $this->actingAs($this->user, 'api')
    		->post('/api/players', $data);
    	$response->assertStatus(200);

    	$player = Player::first();

    	$this->assertEquals($data['first_name'], $player->first_name);
    	$this->assertEquals($data['last_name'], $player->last_name);
    	$this->assertEquals($data['team_id'], $player->team_id);
    	$this->assertEquals($data['user_id'], $player->user_id);
    	$this->assertEquals($data['bats'], $player->bats);
    	$this->assertEquals($data['throws'], $player->throws);
    }

    /** @test */
    public function user_can_update_a_player()
    {   
    	$team = factory(Team::class)->create();
    	$player = factory(Player::class)->create([
    		'user_id' => $this->user->id
    	]);

    	$data = [];
    	$data['first_name'] = 'Shoeless Joe';
    	$data['last_name'] = 'Jackson';
    	$data['team_id'] = $team->id;
    	$data['user_id'] = $this->user->id;
    	$data['bats'] = 'L';
    	$data['throws'] = 'R';

    	$response = $this->actingAs($this->user, 'api')
    		->patch('/api/players/' . $player->id, $data);
    	$response->assertStatus(200);

    	$player = Player::first();

    	$this->assertEquals($data['first_name'], $player->first_name);
    	$this->assertEquals($data['last_name'], $player->last_name);
    	$this->assertEquals($data['team_id'], $player->team_id);
    	$this->assertEquals($data['user_id'], $player->user_id);
    	$this->assertEquals($data['bats'], $player->bats);
    	$this->assertEquals($data['throws'], $player->throws);
    }

    /** @test */
    public function user_can_soft_delete_a_player()
    {   
    	$player = factory(Player::class)->create([
    		'user_id' => $this->user->id
    	]);

    	$response = $this->actingAs($this->user, 'api')
    		->delete('/api/players/' . $player->id);
    	$response->assertStatus(200);

    	$this->assertSoftDeleted('players', $player->toArray());
    }
}