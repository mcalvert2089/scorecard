<?php
namespace Tests\Unit;

use App\Repositories\Repository;
use App\Team;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TeamTest extends TestCase
{
	use DatabaseTransactions;

    /** @test */
    public function can_retrieve_team_list()
    {
    	factory(Team::class, 4)->create();
        $teamModel = new Team;
    	$teams = Team::all();
        $this->assertCount(4, $teams);
    }

    /** @test */
    public function can_create_a_team()
    {
    	$data = [];
    	$data['name'] = 'Athletics';
    	$data['manager'] = 'Bob Melvin';
    	$data['city'] = 'Oakland';
    	$data['state'] = 'CA';

        $teamModel = new Team;
    	$repository = new Repository($teamModel);
    	$newTeam = $repository->create($data);
    	$created = $teamModel->first();

        $this->assertNotNull($created);
        $this->assertEquals($data['name'], $created->name);
        $this->assertEquals($data['manager'], $created->manager);
        $this->assertEquals($data['city'], $created->city);
        $this->assertEquals($data['state'], $created->state);
    }

    /** @test */
    public function can_update_a_team()
    {
    	$team = factory(Team::class)->create();

    	$data = [];
    	$data['name'] = 'New Baseball Team';

    	$teamModel = new Team;
        $repository = new Repository($teamModel);
    	$newTeam = $repository->update($data, $team->id);
    	$updated = $teamModel->first();

        $this->assertEquals($data['name'], $updated->name);
    }
}
